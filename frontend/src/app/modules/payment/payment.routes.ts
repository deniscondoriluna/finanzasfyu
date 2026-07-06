import { Routes } from '@angular/router';
import { PaymentSelectorComponent } from './components/payment-selector/payment-selector.component';
import { PaymentResultComponent } from './components/payment-result/payment-result.component';
import { PaymentErrorComponent } from './components/payment-error/payment-error.component';

export const PAYMENT_ROUTES: Routes = [
  {
    path: 'result',
    component: PaymentResultComponent
  },
  {
    path: 'error',
    component: PaymentErrorComponent
  },
  {
    path: ':id',
    component: PaymentSelectorComponent
  }
];