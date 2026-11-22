import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiah',
  pure: true,
})
export class RupiahPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return 'Rp. 0,00';
    }

    const numericValue = typeof value === 'number' ? value : Number(value);
    if (Number.isNaN(numericValue)) {
      return 'Rp. 0,00';
    }

    const isNegative = numericValue < 0;
    const absoluteFixed = Math.abs(numericValue).toFixed(2);
    const [integerPart, decimalPart] = absoluteFixed.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const prefix = isNegative ? '-Rp. ' : 'Rp. ';

    return `${prefix}${formattedInteger},${decimalPart}`;
  }
}
