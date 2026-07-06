import {
  Component,
  EventEmitter,
  Output,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { luhnValidator } from '../../../validators/luhn.validator';
import { cardExpiryValidator } from '../../../validators/card-expiry.validator';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './card-form.component.html'
})
export class CardFormComponent implements OnInit {

  form: FormGroup;

  @Output()
  formReady = new EventEmitter<FormGroup>();

  months: string[] = [
    '01', '02', '03', '04',
    '05', '06', '07', '08',
    '09', '10', '11', '12'
  ];

  years: number[] = [];

  constructor(private fb: FormBuilder) {
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < 15; i++) {
      this.years.push(currentYear + i);
    }

    this.form = this.fb.group(
      {
        cardNumber: [
          '',
          [
            Validators.required,
            luhnValidator
          ]
        ],

        holder: [
          '',
          Validators.required
        ],

        expiryMonth: [
          '',
          Validators.required
        ],

        expiryYear: [
          '',
          Validators.required
        ],

        cvv: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(4)
          ]
        ]
      },
      {
        validators: cardExpiryValidator()
      }
    );
  }

  ngOnInit(): void {
    this.formReady.emit(this.form);
  }

  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;

    let value = input.value;

    value = value.replace(/\D/g, '');

    if (value.length > 16) {
      value = value.substring(0, 16);
    }

    value = value.replace(/(.{4})/g, '$1 ').trim();

    this.form.get('cardNumber')
      ?.setValue(value, { emitEvent: false });
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

  sanitizeCvv(): void {
    const control = this.form.get('cvv');

    if (!control?.value) {
      return;
    }

    const cleaned = control.value
      .replace(/\D/g, '')
      .slice(0, 4);

    control.setValue(cleaned, { emitEvent: false });
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);

    return !!(
      control &&
      control.invalid &&
      control.touched
    );
  }

  isCardExpired(): boolean {
    return !!this.form.errors?.['expiredCard'];
  }
}