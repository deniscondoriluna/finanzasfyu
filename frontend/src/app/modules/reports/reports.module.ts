import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportsRoutingModule } from './reports-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { ReportByServiceComponent } from './components/report-by-service/report-by-service.component';
import { ReportByDateComponent }    from './components/report-by-date/report-by-date.component';

@NgModule({
  declarations: [
    ReportByServiceComponent,
    ReportByDateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReportsRoutingModule,
    SharedModule
  ]
})
export class ReportsModule {}