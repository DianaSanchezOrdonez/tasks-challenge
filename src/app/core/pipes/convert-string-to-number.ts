import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringtonumber',
  standalone: true,
})
export class ConvertStringToNumberPipe implements PipeTransform {
  transform(value: string): number {
    switch (value) {
      case 'one':
        return 1;
      case 'two':
        return 2;
      case 'four':
        return 4;
      case 'eight':
        return 8;
      default:
        return 0;
    }
  }
}
