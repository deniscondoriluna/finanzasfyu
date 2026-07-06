import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ReportByService, ReportByDate } from '../models/report.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private url = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  // Obtiene todos los pagos y calcula reportes en el frontend
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      catchError(() => of([]))
    );
  }

  // Reporte por servicio
  calcByService(data: any[]): ReportByService[] {
    const map = new Map<string, ReportByService>();

    data.forEach(p => {
      const service = p.originService || 'N/A';
      const amount  = Number(p.amount) || 0;
      const status  = (p.status || '').toUpperCase();
      const cur     = map.get(service) || {
        originService: service,
        total: 0, count: 0,
        paid: 0, rejected: 0, pending: 0
      };

      cur.count++;
      if (status === 'PAID' || status === 'APPROVED') {
        cur.total += amount;
        cur.paid++;
      }
      if (status === 'REJECTED') cur.rejected++;
      if (status === 'PENDING')  cur.pending++;

      map.set(service, cur);
    });

    return Array.from(map.values());
  }

  // Reporte por fecha
  calcByDate(data: any[], from?: string, to?: string): ReportByDate[] {
    let filtered = [...data];

    if (from)
      filtered = filtered.filter(p =>
        new Date(p.createdAt) >= new Date(from)
      );
    if (to)
      filtered = filtered.filter(p =>
        new Date(p.createdAt) <= new Date(to + 'T23:59:59')
      );

    const dateMap = new Map<string, ReportByDate>();

    filtered.forEach(p => {
      const date   = p.createdAt?.substring(0, 10) || 'N/A';
      const amount = Number(p.amount) || 0;
      const status = (p.status || '').toUpperCase();
      const cur    = dateMap.get(date) || {
        date, total: 0, count: 0
      };

      // Cuenta todas las órdenes
      cur.count++;

      // Solo suma al total las pagadas/aprobadas
      if (status === 'PAID' || status === 'APPROVED')
        cur.total += amount;

      dateMap.set(date, cur);
    });

    return Array.from(dateMap.values())
      .sort((a, b) => a.date.localeCompare(b.date));
  }
}