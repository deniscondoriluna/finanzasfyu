import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { CardFormComponent } from '../card-form/card-form.component';
import { TransferFormComponent } from '../transfer-form/transfer-form.component';
import { WalletFormComponent } from '../wallet-form/wallet-form.component';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-selector',
  standalone: true,
  imports: [
    CommonModule,
    CardFormComponent,
    TransferFormComponent,
    WalletFormComponent
  ],
  templateUrl: './payment-selector.component.html'
})
export class PaymentSelectorComponent implements OnInit {

  selectedMethod: string = 'card';
  currentStep: 'method' | 'form' = 'method';

  cardForm: FormGroup | null = null;
  transferForm: FormGroup | null = null;
  walletForm: FormGroup | null = null;

  payment: any = null;
  referenceId = '';

  isLoading = true;
  isProcessing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.referenceId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.referenceId) {
      this.goToError('Referencia de pago no encontrada');
      return;
    }

    this.loadPayment();
  }

  loadPayment(): void {
    this.isLoading = true;

    this.paymentService.getPayment(this.referenceId).subscribe({
      next: (response) => {
        this.payment = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;

        this.goToError(
          error.error?.message ||
          'No se pudo cargar la orden de pago'
        );
      }
    });
  }

  selectMethod(method: string): void {
    this.selectedMethod = method;
  }

  goToForm(): void {
    this.currentStep = 'form';
  }

  goBackToMethods(): void {
    this.currentStep = 'method';
  }

  onCardFormReady(form: FormGroup): void {
    this.cardForm = form;
  }

  onTransferFormReady(form: FormGroup): void {
    this.transferForm = form;
  }

  onWalletFormReady(form: FormGroup): void {
    this.walletForm = form;
  }

  get activeForm(): FormGroup | null {
    if (this.selectedMethod === 'card') {
      return this.cardForm;
    }

    if (this.selectedMethod === 'transfer') {
      return this.transferForm;
    }

    if (this.selectedMethod === 'wallet') {
      return this.walletForm;
    }

    return null;
  }

  canPay(): boolean {
    return !!this.activeForm &&
      this.activeForm.valid &&
      !this.isProcessing &&
      this.payment?.status === 'PENDING';
  }

  submit(): void {
    if (!this.payment) {
      this.goToError('No existe una orden de pago cargada');
      return;
    }

    if (this.payment.status !== 'PENDING') {
      this.goToError('La orden no se encuentra pendiente de pago');
      return;
    }

    if (!this.activeForm) {
      return;
    }

    if (this.activeForm.invalid) {
      this.activeForm.markAllAsTouched();
      return;
    }

    this.isProcessing = true;

    this.paymentService.confirmPayment(
      this.referenceId,
      {
        status: 'APPROVED',
        rejectionReason: null
      }
    ).subscribe({
      next: (response) => {
        this.isProcessing = false;

        this.router.navigate(['/payment/result'], {
          state: {
            result: response
          }
        });
      },
      error: (error) => {
        this.isProcessing = false;

        this.router.navigate(['/payment/error'], {
          state: {
            error: {
              status: error.status || 500,
              message:
                error.error?.message ||
                error.message ||
                'No se pudo procesar el pago',
              detail: 'La operación no pudo completarse.'
            }
          }
        });
      }
    });
  }

  private goToError(message: string): void {
    this.router.navigate(['/payment/error'], {
      state: {
        error: {
          status: 500,
          message,
          detail: 'Verifica la referencia de pago e intenta nuevamente.'
        }
      }
    });
  }
}