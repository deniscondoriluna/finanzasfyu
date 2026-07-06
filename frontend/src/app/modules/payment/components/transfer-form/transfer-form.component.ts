import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { rutValidator } from '../../../validators/rut.validator';
import { accountNumberValidator } from '../../../validators/account-number.validator';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './transfer-form.component.html'
})
export class TransferFormComponent implements OnInit {

  form: FormGroup;

  @Output() formReady = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      bank: ['', Validators.required],
      accountNumber: [
        '',
        [
          Validators.required,
          accountNumberValidator()
        ]
      ],
      rut: [
        '',
        [
          Validators.required,
          rutValidator()
        ]
      ]
    });
  }

  ngOnInit(): void {
    this.formReady.emit(this.form);
  }

  formatRut(): void {
    const control = this.form.get('rut');

    if (!control?.value) {
      return;
    }

    const clean = control.value
      .replace(/\./g, '')
      .replace('-', '')
      .toUpperCase();

    if (clean.length < 2) {
      return;
    }

    const body = clean.slice(0, -1);
    const dv = clean.slice(-1);

    const formattedBody = body.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.'
    );

    control.setValue(`${formattedBody}-${dv}`, {
      emitEvent: false
    });
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

  allowRutCharacters(event: KeyboardEvent): void {
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

    const key = event.key.toLowerCase();

    if (!/^\d$/.test(key) && key !== 'k') {
      event.preventDefault();
    }
  }

  sanitizeAccount(): void {
    const control = this.form.get('accountNumber');

    if (!control?.value) {
      return;
    }

    const cleaned = control.value.replace(/\D/g, '');

    control.setValue(cleaned, {
      emitEvent: false
    });
  }

  sanitizeRut(): void {
    const control = this.form.get('rut');

    if (!control?.value) {
      return;
    }

    const cleaned = control.value
      .replace(/[^0-9kK]/g, '')
      .toUpperCase();

    control.setValue(cleaned, {
      emitEvent: false
    });
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }
}