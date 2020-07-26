import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDuration'
})
export class CustomDurationPipe implements PipeTransform {

  minutes: Number;
  days: Number;

  transform(value: string): unknown {
    this.minutes = Math.floor(((new Date()).valueOf() - (new Date(value.replace("Created on ", ""))).valueOf()) / 60000);
    this.days = Math.ceil((this.minutes.valueOf() / 60) / 24)
    if (this.minutes <= 60) {
      return this.minutes + ' minutes ago';
    }
    else if (this.minutes > 60 && this.minutes < 1440) {
      return Math.floor(this.minutes.valueOf() / 60) + ' hours ago';
    }
    else if (this.days >= 1) {
      return this.days === 1 ? 'a day ago' : this.days + ' days ago';
    }


  }

}
