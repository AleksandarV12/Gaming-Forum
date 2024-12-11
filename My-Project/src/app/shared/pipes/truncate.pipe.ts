import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate', // The name you'll use in your templates
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20): string {
    if (!value) return ''; // Handle null or undefined values
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
