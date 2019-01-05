import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LargeData} from '../models/large-data';
import {map} from 'rxjs/operators';
import {AppFormGroup} from '../app.form-group';

@Injectable({
  providedIn: 'root'
})
export class LargeDataService {
  constructor(
    private _http: HttpClient
  ) { }

  getLargeDataById(propertyId: string): Observable<LargeData> {
    return this._http.get('api/largeData/' + propertyId)
      .pipe(map(response => new LargeData(response as Partial<LargeData>)));
  }

  createLargeData(formGroup: AppFormGroup): Observable<LargeData> {
    formGroup.removeControl('id');
    console.log('Server Data: ', formGroup.getRawValue());
    return this._http.post('api/largeData', formGroup.getRawValue())
      .pipe(map(response => new LargeData(response as Partial<LargeData>)));
  }

  updateLargeData(id: string, formGroup: AppFormGroup) {
    console.log('Server Data: ', formGroup.getRawValue());
    return this._http.put('api/largeData/' + id, formGroup.getRawValue())
      .pipe(map(response => new LargeData(response as Partial<LargeData>)));
  }
}
