import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDurationUtc'
})
export class CustomDurationUtcPipe implements PipeTransform {

  transform(value: number): string {
    return (new Date(value*1000)).toISOString();
  }

}
