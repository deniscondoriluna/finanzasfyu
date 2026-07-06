import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function accountNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const regex = /^[0-9]+$/;

    return regex.test(value)
      ? null
      : { invalidAccountNumber: true };
  };
}