import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./modules/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./modules/payment/payment.routes').then(m => m.PAYMENT_ROUTES)
  },
  {
    path: 'receipt',
    loadChildren: () =>
      import('./modules/receipt/receipt.module').then(m => m.ReceiptModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./modules/reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'audit',
    loadChildren: () =>
      import('./modules/audit/audit.module').then(m => m.AuditModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];