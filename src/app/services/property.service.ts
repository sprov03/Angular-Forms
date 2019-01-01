import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Property} from '../models/propertie';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private _http: HttpClient
  ) { }

  getPropertyById(propertyId: string): Observable<Property> {
    return this._http.get('api/properties/' + propertyId)
      .pipe(map(response => new Property(response as Partial<Property>)));
  }

  createProperty(propertyFormGroup: FormGroup): Observable<Property> {
    propertyFormGroup.removeControl('id');
    console.log('Response: ', propertyFormGroup.getRawValue());
    return this._http.post('api/properties', propertyFormGroup.getRawValue())
      .pipe(map(response => {
        console.log('Response: ', response);
        return new Property(response as Partial<Property>);
      }));
  }
}
