import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enum'
})
export class EnumPipe implements PipeTransform {

  transform(value: any): {key: string, value: any, label: string}[] {
    const keys = [];
    for (const enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10))) {
        keys.push({
          key: value[enumMember],
          value: parseInt(enumMember, 10),
          label: value[enumMember].split(/(?=[A-Z])/).join(' ')
        });
      }
    }

    return keys;
  }
}
