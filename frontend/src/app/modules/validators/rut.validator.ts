import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rutValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const rut = control.value;

    if (!rut) {
      return null;
    }

    const clean = rut
      .replace(/\./g, '')
      .replace('-', '')
      .toUpperCase();

    if (clean.length < 2) {
      return { invalidRut: true };
    }

    const body = clean.slice(0, -1);
    const dv = clean.slice(-1);

    if (!/^[0-9]+$/.test(body)) {
      return { invalidRut: true };
    }

    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      sum += Number(body.charAt(i)) * multiplier;

      multiplier++;

      if (multiplier > 7) {
        multiplier = 2;
      }
    }

    const remainder = 11 - (sum % 11);

    let expectedDv = '';

    if (remainder === 11) {
      expectedDv = '0';
    } else if (remainder === 10) {
      expectedDv = 'K';
    } else {
      expectedDv = remainder.toString();
    }

    return expectedDv === dv
      ? null
      : { invalidRut: true };
  };
}