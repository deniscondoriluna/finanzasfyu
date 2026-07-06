import { AbstractControl, ValidationErrors } from '@angular/forms';

export function luhnValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value || '').replace(/\s+/g, '');

  if (!/^\d+$/.test(value)) return { invalidCard: true };

  let sum = 0;
  let double = false;

  for (let i = value.length - 1; i >= 0; i--) {
    let digit = +value[i];

    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    double = !double;
  }

  return sum % 10 === 0 ? null : { invalidCard: true };
}