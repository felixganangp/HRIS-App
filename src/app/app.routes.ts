import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { Login } from './features/login/login';
import { EmployeeList } from './features/employee/pages/employee-list/employee-list';
import { EmployeeDetail } from './features/employee/pages/employee-detail/employee-detail';
import { EmployeeAdd } from './features/employee/pages/employee-add/employee-add';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  {
    path: 'employees',
    canActivate: [authGuard],
    children: [
      { path: '', component: EmployeeList, pathMatch: 'full' },
      { path: 'add', component: EmployeeAdd, pathMatch: 'full' },
      { path: ':username', component: EmployeeDetail },
    ],
  },
  { path: '**', redirectTo: 'employees' },
];
