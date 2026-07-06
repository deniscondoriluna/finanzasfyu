import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cardExpiryValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const month = control.get('expiryMonth')?.value;
    const year = control.get('expiryYear')?.value;

    if (!month || !year) {
      return null;
    }

    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const selectedMonth = Number(month);
    const selectedYear = Number(year);

    if (
      selectedYear < currentYear ||
      (
        selectedYear === currentYear &&
        selectedMonth < currentMonth
      )
    ) {
      return { expiredCard: true };
    }

    return null;
  };
}