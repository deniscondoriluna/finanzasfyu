import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../../modules/orders/models/order.model';

@Pipe({
  name: 'ordersByStatus',
  standalone: false
})
export class OrdersByStatusPipe implements PipeTransform {
  transform(orders: Order[], status: string): number {
    return orders.filter(o => o.status === status).length;
  }
}