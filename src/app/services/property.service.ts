import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Property} from '../models/propertie';
import {FormControl, FormGroup} from '@angular/forms';
import {AppFormGroup} from '../app.form-group';
import {AppFormArray} from '../app.form-array';
import {AddressFormGroup} from './user.service';

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

  createProperty(propertyFormGroup: FormGroup | PropertyFormGroup): Observable<Property> {
    propertyFormGroup.removeControl('id');
    return this._http.post('api/properties', propertyFormGroup.getRawValue())
      .pipe(map(response => new Property(response as Partial<Property>)));
  }
}

export class PropertyFormGroup extends AppFormGroup {
  controls: {
    id: FormControl;
    contacts: AppFormArray<ContactFormGroup>;
    address: AddressFormGroup;
    appointments: AppFormArray<AppointmentFormGroup>;
    createdById: FormControl;
    updatedById: FormControl;
    deletedById: FormControl;
  };
}

export class ContactFormGroup extends AppFormGroup {
  controls: {
    id: FormControl;
    firstName: FormControl;
    lastName: FormControl;
    displayLabel: FormControl;
  };
}

export class AppointmentFormGroup extends AppFormGroup {
  controls: {
    id: FormControl;
    startTime: FormControl;
    endTime: FormControl;
  };
}
