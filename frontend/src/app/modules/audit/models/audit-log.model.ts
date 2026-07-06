import { Component, OnInit } from '@angular/core';
import { AuditService, AuditEntry, AuditStats } from '../../services/audit.service';

@Component({
  selector: 'app-audit-log',
  standalone: false,
  templateUrl: './audit-log.component.html',
  styleUrl: './audit-log.component.css'
})
export class AuditLogComponent implements OnInit {
  entries:  AuditEntry[] = [];
  filtered: AuditEntry[] = [];
  stats:    AuditStats | null = null;
  loading   = false;
  errorMsg  = '';

  // Filtros
  filterStatus  = '';
  filterService = '';
  filterFrom    = '';
  filterTo      = '';

  statusOptions  = ['PENDING', 'PAID', 'REJECTED', 'CANCELLED'];
  serviceOptions = ['MATRICULA', 'BIBLIOTECA', 'CAFETERIA',
                    'LABORATORIO', 'DEPORTES', 'OTRO'];

  constructor(private auditService: AuditService) {}

  ngOnInit(): void {
    this.loadEntries();
  }

  loadEntries(): void {
    this.loading  = true;
    this.errorMsg = '';

    this.auditService.getAll().subscribe({
      next: (data) => {
        this.entries  = data;
        this.applyFilters();
        this.stats    = this.auditService.calcStats(data);
        this.loading  = false;
      },
      error: (err: Error) => {
        this.errorMsg = err.message;
        this.loading  = false;
      }
    });
  }

  applyFilters(): void {
    let data = [...this.entries];

    if (this.filterStatus)
      data = data.filter(e => e.status === this.filterStatus);

    if (this.filterService)
      data = data.filter(e => e.originService === this.filterService);

    if (this.filterFrom)
      data = data.filter(e =>
        new Date(e.createdAt) >= new Date(this.filterFrom)
      );

    if (this.filterTo)
      data = data.filter(e =>
        new Date(e.createdAt) <= new Date(this.filterTo + 'T23:59:59')
      );

    this.filtered = data;
    // Recalcula stats solo con los filtrados
    this.stats = this.auditService.calcStats(data);
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.filterStatus  = '';
    this.filterService = '';
    this.filterFrom    = '';
    this.filterTo      = '';
    this.applyFilters();
  }

  getBadgeClass(status: string): string {
    const map: Record<string, string> = {
      PENDING:   'badge-pending',
      PAID:      'badge-paid',
      REJECTED:  'badge-rejected',
      CANCELLED: 'badge-cancelled'
    };
    return map[status] ?? 'bg-secondary';
  }

  formatCLP(value: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency', currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  }
}