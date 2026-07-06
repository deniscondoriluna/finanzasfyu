import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SharedModule],
  template: `
    <div class="d-flex">
      <!-- Sidebar: solo visible cuando hay sesión -->
      <app-sidebar *ngIf="isLoggedIn$ | async"></app-sidebar>

      <!-- Contenido principal -->
      <div [class.main-with-sidebar]="isLoggedIn$ | async"
           class="main-content flex-grow-1">
        <app-spinner></app-spinner>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .main-with-sidebar {
      margin-left: 220px;
      min-height: 100vh;
      background: #F5F7FA;
    }
    .main-content {
      min-height: 100vh;
      background: #F5F7FA;
    }
  `]
})
export class AppComponent implements OnInit {
  isLoggedIn$: any;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
    this.authService.checkSession();
  }
}