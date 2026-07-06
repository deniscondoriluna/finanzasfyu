import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { OrderStatus } from '../../../../shared/enums/order-status.enum';
import { OrderFilterDto } from '../../models/order-filter.dto';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading         = false;
  errorMsg        = '';

  OrderStatus = OrderStatus;

  filterStatus  = '';
  filterService = '';

  // Controla si el usuario es operador
  isOperator  = false;
  userService = ''; // servicio del operador logueado

  statusOptions  = Object.values(OrderStatus);
  serviceOptions = [
    'MATRICULA', 'BIBLIOTECA', 'CAFETERIA', 'ALOJAMIENTO',
  ];

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();

    if (user?.role === 'OPERATOR') {
      this.isOperator  = true;
      this.userService = user.service;
      // Fija el filtro al servicio del operador
      this.filterService = user.service;
    }

    this.loadOrders();
  }

  loadOrders(): void {
    this.loading  = true;
    this.errorMsg = '';

    const filters: OrderFilterDto = {};

    if (this.filterStatus) {
      filters.status = this.filterStatus as OrderStatus;
    }

    // Si es operador siempre filtra por su servicio
    if (this.isOperator) {
      filters.originService = this.userService;
    } else if (this.filterService) {
      filters.originService = this.filterService;
    }

    this.orderService.getAll(filters).subscribe({
      next: (data) => {
        this.orders  = data;
        this.loading = false;
      },
      error: (err: Error) => {
        this.errorMsg = err.message;
        this.loading  = false;
      }
    });
  }

  onFilterChange(): void {
    this.loadOrders();
  }

  clearFilters(): void {
    this.filterStatus = '';
    // Operador no puede limpiar su filtro de servicio
    if (!this.isOperator) {
      this.filterService = '';
    }
    this.loadOrders();
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