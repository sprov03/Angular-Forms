import { Component, OnInit } from '@angular/core';
import {LargeDataService} from '../../services/large-data.service';
import {LargeData, LargeDataFormGroup} from '../../models/large-data';

@Component({
  selector: 'app-large-random-data-page',
  templateUrl: './large-random-data-page.component.html',
  styleUrls: ['./large-random-data-page.component.scss']
})
export class LargeRandomDataPageComponent implements OnInit {
  largeDataFormGroup: LargeDataFormGroup;
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
    // This is done this way to generate an id for the Data
    // (Since i don't want to deal with building mock data for this demo)
    this._largeDataService.createLargeData(this.largeDataFormGroup).subscribe(largeData => {
      this.largeData = largeData;
      this.largeDataFormGroup = new LargeData(largeData).toFormGroup();
      this.largeDataFormGroup.addProperty();
      this.largeDataFormGroup.addUser({
        firstName: 'David',
        lastName: 'Wakolviak'
      });
      this.largeDataFormGroup.addUser({
        firstName: 'Shawn',
        lastName: 'Pivonka'
      });
      this.largeDataFormGroup.controls.properties.controls[0].addContact({
        firstName: 'Testing First Name',
        lastName: 'Testing Last Name',
      });
      this.largeDataFormGroup.addAddress();
      this.largeDataFormGroup.addAddress();
      this.largeDataFormGroup.addAddress();
      this.largeDataFormGroup.addAddress();
      this.largeDataFormGroup.addAddress();
      this.largeDataFormGroup.setAddressesToSomethingFunny('Funny Street Name');
    });
  }

  updateLargeData() {
    this._largeDataService.updateLargeData(this.largeData.id, this.largeDataFormGroup).subscribe(largeData => {
      // this is petending the api is giving back what i want
      this.largeData = this.largeDataFormGroup.getRawValue();
      this.largeDataFormGroup = new LargeData(this.largeData).toFormGroup();
    });
  }
}
