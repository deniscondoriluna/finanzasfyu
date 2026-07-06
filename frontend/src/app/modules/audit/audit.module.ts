import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditRoutingModule } from './audit-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AuditLogComponent } from './components/audit-log/audit-log.component';

@NgModule({
  declarations: [AuditLogComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuditRoutingModule,
    SharedModule
  ]
})
export class AuditModule {}