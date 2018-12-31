import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TemplateFormPageComponent} from './pages/template-form-page/template-form-page.component';
import {ReactiveFormPageComponent} from './pages/reactive-form-page/reactive-form-page.component';
import {UserPageComponent} from './pages/user-page/user-page.component';
import {PropertyWithoutInterfacesComponent} from './pages/property-without-interfaces/property-without-interfaces.component';
import {PropertyWithInterfacesComponent} from './pages/property-with-interfaces/property-with-interfaces.component';

const routes: Routes = [
  {path: 'template-forms', component: TemplateFormPageComponent},
  {path: 'reactive-forms', component: ReactiveFormPageComponent},
  {path: '', component: UserPageComponent},
  {path: 'property-example-with-not-interfaces', component: PropertyWithoutInterfacesComponent},
  {path: 'property-example-with-interfaces', component: PropertyWithInterfacesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
