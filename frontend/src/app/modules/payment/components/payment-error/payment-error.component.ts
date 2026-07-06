import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-error.component.html',
  styleUrls: ['./payment-error.component.css']
})
export class PaymentErrorComponent {

  error: any;

  constructor(
    private router: Router
  ) {

    this.error =
      history.state.error ??
      {
        status: 500,
        message: 'No se pudo procesar el pago',
        detail: 'Ocurrió un error inesperado.'
      };

  }

  retry(): void {
    this.router.navigate(['/payment/1']);
  }

  goHome(): void {
    this.router.navigate(['/orders']);
  }
}