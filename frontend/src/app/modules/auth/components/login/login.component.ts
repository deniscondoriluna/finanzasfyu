import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Formulario reactivo
  form: FormGroup;
  errorMsg = '';
  loading  = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getters para acceder fácilmente desde el template
  get email()    { return this.form.get('email')!;    }
  get password() { return this.form.get('password')!; }

  onSubmit(): void {
    // Si el formulario es inválido marca todos los campos
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading  = true;
    this.errorMsg = '';

    this.authService.login(this.form.value).subscribe({
      next:  () => this.router.navigate(['/orders']),
      error: (err: Error) => {
        this.errorMsg = err.message;
        this.loading  = false;
      }
    });
  }
}