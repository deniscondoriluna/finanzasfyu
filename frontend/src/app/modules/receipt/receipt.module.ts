import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptRoutingModule } from './receipt-routing.module';
import { ReceiptViewComponent } from './components/receipt-view/receipt-view.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ReceiptViewComponent],
  imports: [
    CommonModule,
    ReceiptRoutingModule,
    SharedModule
  ]
})
export class ReceiptModule {}