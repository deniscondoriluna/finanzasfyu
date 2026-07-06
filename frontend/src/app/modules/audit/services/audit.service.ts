import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface AuditEntry {
  id:              string;
  referenceId:     string;
  originService:   string;
  amount:          number;
  status:          string;
  paymentMethod:   string;
  rejectionReason: string | null;
  description:     string;
  createdAt:       string;
  updatedAt:       string;
}

export interface AuditStats {
  totalRecaudado:  number;
  totalOrdenes:    number;
  porEstado:       { status: string; count: number; total: number }[];
  porServicio:     { service: string; count: number; total: number }[];
}

@Injectable({ providedIn: 'root' })
export class AuditService {
  private url = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AuditEntry[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(data => data.map(p => ({
        id:              p.id,
        referenceId:     p.referenceId || p.id,
        originService:   p.originService || 'N/A',
        amount:          Number(p.amount),
        status:          (p.status || 'PENDING').toUpperCase(),
        paymentMethod:   p.paymentMethod || 'N/A',
        rejectionReason: p.rejectionReason,
        description:     p.description || '',
        createdAt:       p.createdAt,
        updatedAt:       p.updatedAt
      }))),
      catchError(() => of([]))
    );
  }

  // Calcula estadísticas desde los datos obtenidos
  
  calcStats(entries: AuditEntry[]): AuditStats {
    // Total recaudado — incluye PAID y APPROVED
    const paid = entries.filter(e =>
      e.status === 'PAID' || e.status === 'APPROVED'  
    );
    const totalRecaudado = paid.reduce((sum, e) => sum + e.amount, 0);

    // Agrupar por estado
    const estadoMap = new Map<string, { count: number; total: number }>();
    entries.forEach(e => {
      const cur = estadoMap.get(e.status) || { count: 0, total: 0 };
      const isPaid = e.status === 'PAID' || e.status === 'APPROVED';
      estadoMap.set(e.status, {
        count: cur.count + 1,
        total: cur.total + (isPaid ? e.amount : 0)
      });
    });

  // Agrupar por servicio
  const servicioMap = new Map<string, { count: number; total: number }>();
  entries.forEach(e => {
    const cur = servicioMap.get(e.originService) || { count: 0, total: 0 };
    const isPaid = e.status === 'PAID' || e.status === 'APPROVED';
    servicioMap.set(e.originService, {
      count: cur.count + 1,
      total: cur.total + (isPaid ? e.amount : 0)
    });
  });

  return {
    totalRecaudado,
    totalOrdenes: entries.length,
    porEstado:    Array.from(estadoMap.entries()).map(
      ([status, v]) => ({ status, ...v })
    ),
    porServicio:  Array.from(servicioMap.entries()).map(
      ([service, v]) => ({ service, ...v })
    )
  };
}


}