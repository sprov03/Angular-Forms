import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errors'
})
export class ErrorsPipe implements PipeTransform {
  transform(errors: any): {type: string, message: string}[] {
    const errorsAsArray = [];
    for (const error in errors) {
      if (!errors.hasOwnProperty(error)) {
        return;
      }

      errorsAsArray.push({
        type: error,
        message: errors[error]
      });
    }

    console.log('Errors: ', errorsAsArray);
    return errorsAsArray;
  }
}
