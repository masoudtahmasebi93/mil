import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
    },
    {
      path: 'admin',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    },
    { path: '**', redirectTo: '' }, // Redirect unknown routes
  ];