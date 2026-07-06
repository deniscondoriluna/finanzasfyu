import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { OrderStatus } from '../../../../shared/enums/order-status.enum';

@Component({
  selector: 'app-order-detail',
  standalone: false,
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  loading   = false;
  errorMsg  = '';

  OrderStatus = OrderStatus;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.loadOrder(id);
  }

  loadOrder(id: string): void {
    this.loading  = true;
    this.errorMsg = '';

    // Llama al backend por referenceId
    this.orderService.getByReference(id).subscribe({
      next: (data) => {
        this.order   = data;
        this.loading = false;
      },
      error: (err: Error) => {
        this.errorMsg = err.message;
        this.loading  = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/orders']);
  }

  getBadgeClass(status: string): string {
    const map: Record<string, string> = {
      PENDING:   'badge-pending',
      PAID:      'badge-paid',
      APPROVED:  'badge-approved',
      REJECTED:  'badge-rejected',
      CANCELLED: 'badge-cancelled'
    };
    return map[status] ?? 'bg-secondary';
  }
}