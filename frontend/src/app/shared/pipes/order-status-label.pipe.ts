import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../enums/order-status.enum';

@Pipe({
  name: 'orderStatusLabel',
  standalone: false
})
export class OrderStatusLabelPipe implements PipeTransform {
  private labels: Record<string, string> = {
    [OrderStatus.PENDING]:   'Pendiente',
    [OrderStatus.PAID]:      'Pagada',
    [OrderStatus.APPROVED]:  'Aprobada',
    [OrderStatus.REJECTED]:  'Rechazada',
    [OrderStatus.CANCELLED]: 'Cancelada'
  };

  transform(value: string): string {
    return this.labels[value] ?? value;
  }
}