import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-result.component.html',
  styleUrls: ['./payment-result.component.css']
})
export class PaymentResultComponent {

  result: any;

  constructor(private router: Router) {
    this.result = history.state.result;
  }

  getStatusLabel(status: string): string {
    if (status === 'PAID' || status === 'APPROVED') {
      return 'Pagado';
    }

    if (status === 'PENDING') {
      return 'Pendiente';
    }

    if (status === 'REJECTED') {
      return 'Rechazado';
    }

    if (status === 'CANCELLED') {
      return 'Cancelado';
    }

    return status || 'Sin estado';
  }

  getStatusClass(status: string): string {
    if (status === 'PAID' || status === 'APPROVED') {
      return 'status-paid';
    }

    if (status === 'PENDING') {
      return 'status-pending';
    }

    if (status === 'REJECTED') {
      return 'status-rejected';
    }

    if (status === 'CANCELLED') {
      return 'status-cancelled';
    }

    return 'status-default';
  }

  goBack(): void {
    if (this.result?.referenceId) {
      this.router.navigate(['/payment', this.result.referenceId]);
      return;
    }

    this.router.navigate(['/orders']);
  }

  printReceipt(): void {
    window.print();
  }
}