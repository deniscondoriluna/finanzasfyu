import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-wallet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wallet-form.component.html'
})
export class WalletFormComponent implements OnInit {

  form: FormGroup;

  @Output() formReady = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      studentEmail: ['', [Validators.required, Validators.email]],
      pin: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(6),
          Validators.pattern(/^[0-9]+$/)
        ]
      ]
    });
  }

  ngOnInit(): void {
    this.formReady.emit(this.form);
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Home',
      'End'
    ];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault();
    }
  }

  sanitizePin(): void {
    const control = this.form.get('pin');

    if (!control?.value) {
      return;
    }

    const cleaned = control.value
      .replace(/\D/g, '')
      .slice(0, 6);

    control.setValue(cleaned, { emitEvent: false });
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }
}