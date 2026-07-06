import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { ReportByDate } from '../../models/report.model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-report-by-date',
  standalone: false,
  templateUrl: './report-by-date.component.html',
  styleUrl: './report-by-date.component.css'
})
export class ReportByDateComponent implements OnInit, AfterViewChecked {
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;

  data:    ReportByDate[] = [];
  loading  = false;
  errorMsg = '';
  chart:   Chart | null = null;
  private chartRendered = false; // evita renderizar múltiples veces

  filterFrom    = '';
  filterTo      = '';
  filterService = '';

  get totalRecaudado(): number {
    return this.data.reduce((sum, d) => sum + d.total, 0);
  }

  get totalOrdenes(): number {
    return this.data.reduce((sum, d) => sum + d.count, 0);
  }

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadData();
  }

  // Se ejecuta cada vez que la vista se actualiza
  ngAfterViewChecked(): void {
    if (this.chartCanvas?.nativeElement && !this.chartRendered && this.data.length > 0) {
      this.chartRendered = true;
      this.renderChart();
    }
  }

  loadData(): void {
    this.loading       = true;
    this.errorMsg      = '';
    this.chartRendered = false; // resetea para que vuelva a renderizar

    this.reportService.getAll().subscribe({
      next: (raw) => {
        const filtered = this.filterService
          ? raw.filter(p => p.originService === this.filterService)
          : raw;

        this.data    = this.reportService.calcByDate(
          filtered, this.filterFrom, this.filterTo
        );
        this.loading = false;
      },
      error: (err: Error) => {
        this.errorMsg = err.message;
        this.loading  = false;
      }
    });
  }

  onFilterChange(): void {
    this.chartRendered = false;
    this.loadData();
  }

  clearFilters(): void {
    this.filterFrom    = '';
    this.filterTo      = '';
    this.filterService = '';
    this.chartRendered = false;
    this.loadData();
  }

  renderChart(): void {
    if (!this.chartCanvas?.nativeElement) return;
    if (this.chart) this.chart.destroy();

    const labels    = this.data.map(d => d.date);
    const totals    = this.data.map(d => d.total);
    const chartType = labels.length <= 3 ? 'bar' : 'line';

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: chartType,
      data: {
        labels,
        datasets: [{
          label: 'Recaudado (CLP)',
          data: totals,
          borderColor: '#1B3A6B',
          backgroundColor: chartType === 'bar'
            ? 'rgba(27, 58, 107, 0.8)'
            : 'rgba(27, 58, 107, 0.1)',
          borderWidth: 2,
          borderRadius: chartType === 'bar' ? 6 : 0,
          pointBackgroundColor: '#2E75B6',
          pointRadius: chartType === 'bar' ? 0 : 5,
          fill: chartType === 'line',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: this.filterService
              ? `Recaudación — ${this.filterService}`
              : 'Recaudación por Fecha'
          }
        },
        scales: {
          y: {
            title: { display: true, text: 'Monto (CLP)' },
            beginAtZero: true
          },
          x: {
            title: { display: true, text: 'Fecha' }
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