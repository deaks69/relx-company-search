import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'month',
  standalone: true,
})
export class MonthPipe implements PipeTransform {
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  transform(value: number | undefined): string {
    return value && value > 0 && value <= 12 ? this.months[value - 1] : '';
  }
}
