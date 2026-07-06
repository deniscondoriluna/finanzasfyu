import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function studentEmailValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const email = control.value;

    if (!email) {
      return null;
    }

    const regex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regex.test(email)
      ? null
      : { invalidStudentEmail: true };

  };

}