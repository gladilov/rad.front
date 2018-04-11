import {DatePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends DatePipe implements PipeTransform {

  transform(value: any, format = 'mediumDate', timezone = '+00:00', locale?: string): string | null {
    const val = super.transform(value, format);
    return `${val} (MSK${timezone})`;
  }
}
