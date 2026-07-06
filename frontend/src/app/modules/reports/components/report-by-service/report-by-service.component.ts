import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ReportByService } from '../../models/report.model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-report-by-service',
  standalone: false,
  templateUrl: './report-by-service.component.html',
  styleUrl: './report-by-service.component.css'
})
export class ReportByServiceComponent implements OnInit, AfterViewInit {
  // @ViewChild: accede al canvas de la gráfica
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  data:     ReportByService[] = [];
  loading   = false;
  errorMsg  = '';
  chart:    Chart | null = null;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {}

  loadData(): void {
    this.loading  = true;
    this.errorMsg = '';

    // Observable: llamada al backend
    this.reportService.getAll().subscribe({
      next: (raw) => {
        this.data    = this.reportService.calcByService(raw);
        this.loading = false;
        setTimeout(() => this.renderChart(), 100);
      },
      error: (err: Error) => {
        this.errorMsg = err.message;
        this.loading  = false;
      }
    });
  }

  renderChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.data.map(d => d.originService);
    const totals = this.data.map(d => d.total);
    const counts = this.data.map(d => d.count);

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Recaudado (CLP)',
            data: totals,
            backgroundColor: 'rgba(27, 58, 107, 0.8)',
            borderColor: '#1B3A6B',
            borderWidth: 1,
            borderRadius: 6
          },
          {
            label: 'N° Órdenes',
            data: counts,
            backgroundColor: 'rgba(46, 117, 182, 0.6)',
            borderColor: '#2E75B6',
            borderWidth: 1,
            borderRadius: 6,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: 'Recaudación por Servicio'
          }
        },
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            title: { display: true, text: 'Monto (CLP)' }
          },
          y1: {
            type: 'linear',
            position: 'right',
            title: { display: true, text: 'N° Órdenes' },
            grid: { drawOnChartArea: false }
          }
        }
      }
    });
  }

  formatCLP(value: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  }
}