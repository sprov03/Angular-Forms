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
      .pipe(map(response => new Property(response)));
  }

  createProperty(propertyFormGroup: FormGroup): Observable<Property> {
    return this._http.post('api/properties', propertyFormGroup.getRawValue())
      .pipe(map(response => new Property(response)));
  }
}
