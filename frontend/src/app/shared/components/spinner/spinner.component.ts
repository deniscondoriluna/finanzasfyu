import { Component } from '@angular/core';
import { SpinnerService } from '../../../core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: false,
  template: `
    <div class="spinner-overlay" *ngIf="spinnerService.isLoading$ | async">
      <div class="spinner-border text-primary"
           style="width:3rem;height:3rem;">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
  `
})
export class SpinnerComponent {
  constructor(public spinnerService: SpinnerService) {}
}