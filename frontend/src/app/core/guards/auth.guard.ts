import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // 1. ¿Hay sesión activa?
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // 2. ¿La ruta requiere un rol específico?
    const requiredRole = route.data?.['role'];
    if (requiredRole) {
      const user = this.authService.getCurrentUser();
      if (user?.role !== requiredRole) {
        // No tiene el rol → redirige a su página principal
        if (user?.role === 'ADMIN') {
          this.router.navigate(['/orders']);
        } else {
          this.router.navigate(['/reports']);
        }
        return false;
      }
    }

    return true;
  }
}