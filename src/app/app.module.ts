import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateFormPageComponent } from './pages/template-form-page/template-form-page.component';
import { ReactiveFormPageComponent } from './pages/reactive-form-page/reactive-form-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EnumPipe } from './pipes/enum.pipe';
import { ErrorsPipe } from './pipes/errors.pipe';
import { CatFormComponent } from './forms/cat-form/cat-form.component';
import { ValidationErrorLabelsComponent } from './forms/validation-error-labels/validation-error-labels.component';
import { InputComponent } from './forms/input/input.component';
import { FilterPipe } from './pipes/filter.pipe';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { TodoFormComponent } from './forms/todo-form/todo-form.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import {HttpClientModule} from '@angular/common/http';
import { PropertyWithoutInterfacesComponent } from './pages/property-without-interfaces/property-without-interfaces.component';
import { PropertyWithInterfacesComponent } from './pages/property-with-interfaces/property-with-interfaces.component';
import { LargeRandomDataPageComponent } from './pages/large-random-data-page/large-random-data-page.component';
import { PropertyFormComponent } from './pages/large-random-data-page/property-form/property-form.component';
import { ContactFormComponent } from './pages/large-random-data-page/contact-form/contact-form.component';
import { AddressFormComponent } from './pages/large-random-data-page/address-form/address-form.component';
import { AppointmentFormComponent } from './pages/large-random-data-page/appointment-form/appointment-form.component';
import { UserFormComponent } from './pages/large-random-data-page/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateFormPageComponent,
    ReactiveFormPageComponent,
    EnumPipe,
    ErrorsPipe,
    CatFormComponent,
    ValidationErrorLabelsComponent,
    InputComponent,
    FilterPipe,
    UserPageComponent,
    TodoFormComponent,
    PropertyWithoutInterfacesComponent,
    PropertyWithInterfacesComponent,
    LargeRandomDataPageComponent,
    PropertyFormComponent,
    ContactFormComponent,
    AddressFormComponent,
    AppointmentFormComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
