import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { CatalogEditorComponent } from './catalog-editor/catalog-editor.component';
import {AuthGuard} from "../shared/guards/auth.guard";
import {LoginComponent} from "./login/login.component";

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   {
//     path: '',
//     component: DashboardComponent,
//     canActivate: [AuthGuard],
//   },
//   { path: 'appointments', component: AppointmentListComponent },
//   { path: 'appointments/:id', component: AppointmentDetailComponent },
//   {
//     path: 'catalog',
//     component: CatalogEditorComponent,
//     // canActivate: [AuthGuard],
//   },
// ];

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'appointments', component: AppointmentListComponent },
      { path: 'appointments/:id', component: AppointmentDetailComponent },
      { path: 'catalog', component: CatalogEditorComponent },
      { path: '', redirectTo: 'appointments', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
