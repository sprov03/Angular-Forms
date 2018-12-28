import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], filter: (value: any) => boolean): any {
    return values.filter(filter);
  }
}
