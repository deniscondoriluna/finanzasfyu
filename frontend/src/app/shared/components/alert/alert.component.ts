import { Component, Input, OnInit } from '@angular/core';

export type AlertType = 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'app-alert',
  standalone: false,
  template: `
    <div *ngIf="visible"
         class="alert alert-dismissible fade show"
         [class]="'alert alert-' + type"
         role="alert">
      {{ message }}
      <button type="button" class="btn-close" (click)="visible = false">
      </button>
    </div>
  `
})
export class AlertComponent implements OnInit {
  @Input() message   = '';
  @Input() type: AlertType = 'info';
  @Input() autoClose = false;

  visible = true;

  ngOnInit(): void {
    if (this.autoClose) {
      setTimeout(() => this.visible = false, 4000);
    }
  }
}