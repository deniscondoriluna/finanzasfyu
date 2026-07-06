import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Order } from '../models/order.model';
import { OrderFilterDto } from '../models/order-filter.dto';
import { OrderStatus } from '../../../shared/enums/order-status.enum';
import { ORDERS_MOCK } from '../../../shared/mocks/orders.mock';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private url = `${environment.apiUrl}/payments`;

  // ← false = backend real
  private useMock = false;

  constructor(private http: HttpClient) {}

  getAll(filters?: OrderFilterDto): Observable<Order[]> {
    if (this.useMock) {
      let data = [...ORDERS_MOCK];
      if (filters?.status)
        data = data.filter(o => o.status === filters.status);
      if (filters?.originService)
        data = data.filter(o => o.originService === filters.originService);
      return of(data);
    }

    return this.http.get<any[]>(this.url).pipe(
      map(data => {
        let orders = data.map(p => this.mapToOrder(p));
        // Filtros en frontend mientras no hay query params en el backend
        if (filters?.status)
          orders = orders.filter(o => o.status === filters.status);
        if (filters?.originService)
          orders = orders.filter(o => o.originService === filters.originService);
        return orders;
      }),
      catchError(() => of([]))
    );
  }

  getByReference(referenceId: string): Observable<Order> {
    if (this.useMock) {
      const order = ORDERS_MOCK.find(o => o.externalRef === referenceId);
      return of(order!);
    }
    return this.http.get<any>(`${this.url}/${referenceId}`).pipe(
      map(p => this.mapToOrder(p))
    );
  }

  // Mantiene compatibilidad con order-detail que usa getById
  getById(id: string): Observable<Order> {
    return this.getByReference(id);
  }

  confirm(referenceId: string, body: {
    status: string;
    rejectionReason?: string;
  }): Observable<any> {
    return this.http.patch<any>(
      `${this.url}/${referenceId}/confirm`, body
    );
  }
  cancel(id: string): Observable<Order> {
    // No implementado en el backend aún
    return of({} as Order);
  }

  // Mapea respuesta del backend al modelo del frontend
  private mapToOrder(p: any): Order {
    return {
      id:              p.id,
      externalRef:     p.referenceId || p.id,
      originService:   p.originService || 'N/A',
      amount:          Number(p.amount),
      currency:        'CLP',
      description:     p.description || '',
      status:          (p.status || 'PENDING').toUpperCase() as OrderStatus,
      paymentMethod:   p.paymentMethod,
      rejectionReason: p.rejectionReason,
      callbackUrl:     p.callbackUrl,
      createdAt:       p.createdAt,
      updatedAt:       p.updatedAt,
      paidAt:          p.paidAt || null
    };
  }


  /*
  constructor(private http: HttpClient) {}

  getAll(filters?: OrderFilterDto): Observable<Order[]> {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
          params = params.set(k, String(v));
        }
      });
    }
    return this.http.get<Order[]>(this.url, { params });
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.url}/${id}`);
  }

  cancel(id: number): Observable<Order> {
    return this.http.patch<Order>(`${this.url}/${id}/cancel`, {});
  }
  */
}
