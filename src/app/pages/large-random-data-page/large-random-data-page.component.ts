import { Component, OnInit } from '@angular/core';
import {LargeDataService} from '../../services/large-data.service';
import {LargeData} from '../../models/large-data';
import {AppFormGroup} from '../../app.form-group';
import {FormArray} from '@angular/forms';
import {Property} from '../../models/propertie';
import {Address, User} from '../../models/user';

@Component({
  selector: 'app-large-random-data-page',
  templateUrl: './large-random-data-page.component.html',
  styleUrls: ['./large-random-data-page.component.scss']
})
export class LargeRandomDataPageComponent implements OnInit {
  largeDataFormGroup: AppFormGroup;
  largeData: LargeData;

  constructor(
    private _largeDataService: LargeDataService
  ) { }

  ngOnInit() {
    this.largeData = new LargeData();
    this.largeDataFormGroup = this.largeData.toFormGroup();
    this.createLargeData();
  }

  createLargeData() {
    this._largeDataService.createLargeData(this.largeDataFormGroup).subscribe(largeData => {
      this.largeData = largeData;
      this.largeDataFormGroup = new LargeData(largeData).toFormGroup();
      this.addPropertyToLargeData();
      this.addUser();
      this.addAddress();
      this.addAddress();
    });
  }

  updateLargeData() {
    this._largeDataService.updateLargeData(this.largeData.id, this.largeDataFormGroup).subscribe(largeData => {
      // this is petending the api is giving back what i want
      this.largeData = this.largeDataFormGroup.getRawValue();
      this.largeDataFormGroup = new LargeData(this.largeData).toFormGroup();
    });
  }

  addPropertyToLargeData() {
    const properteis = this.largeDataFormGroup.get('properties') as FormArray;
    properteis.controls.push(new Property().toFormGroup());
  }

  addUser() {
    const users = this.largeDataFormGroup.get('users') as FormArray;
    users.controls.push(new User().toFormGroup());
  }

  addAddress() {
    const addresses = this.largeDataFormGroup.get('addresses') as FormArray;
    addresses.controls.push(new Address().toFormGroup());
  }
}
