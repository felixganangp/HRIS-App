import { Pipe, PipeTransform } from '@angular/core';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'Mei',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@Pipe({
  name: 'dateTime',
  pure: true,
})
export class DateTimePipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined, includeTime: boolean = true): string {
    if (value === null || value === undefined || value === '') {
      return '-';
    }

    const parsedDate = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(parsedDate.getTime())) {
      return '-';
    }

    const day = String(parsedDate.getDate()).padStart(2, '0');
    const month = MONTHS[parsedDate.getMonth()];
    const year = parsedDate.getFullYear();

    if (!includeTime) {
      return `${day} ${month} ${year}`;
    }

    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}:${minutes} WIB`;
  }
}
