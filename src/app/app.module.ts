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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
