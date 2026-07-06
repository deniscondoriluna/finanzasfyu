import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyClp',
  standalone: false
})
export class CurrencyClpPipe implements PipeTransform {
  transform(value: number | string): string {
    const num = Number(value);
    if (isNaN(num)) return '-';
    return new Intl.NumberFormat('es-CL', {
      style:                 'currency',
      currency:              'CLP',
      minimumFractionDigits: 0
    }).format(num);
  }
}