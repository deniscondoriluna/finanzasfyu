import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportByServiceComponent } from './components/report-by-service/report-by-service.component';
import { ReportByDateComponent }    from './components/report-by-date/report-by-date.component';

const routes: Routes = [
  { path: '',        redirectTo: 'service', pathMatch: 'full' },
  { path: 'service', component: ReportByServiceComponent },
  { path: 'date',    component: ReportByDateComponent    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}