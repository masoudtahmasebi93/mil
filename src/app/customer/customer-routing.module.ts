import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ServiceCatalogComponent} from './service-catalog/service-catalog.component';
import {AppointmentBookingComponent} from './appointment-booking/appointment-booking.component';
import {AppointmentConfirmationComponent} from './appointment-confirmation/appointment-confirmation.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'book', component: AppointmentBookingComponent },
  { path: 'categories/:id', component: ServiceCatalogComponent },
  { path: 'services', component: ServiceCatalogComponent },
  { path: 'confirmation', component: AppointmentConfirmationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {
}
