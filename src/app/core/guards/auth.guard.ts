import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { EmployeeStateService } from '../services/employee-state.service';

export const authGuard: CanActivateFn = () => {
  const state = inject(EmployeeStateService);
  const router = inject(Router);

  if (state.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

export const guestGuard: CanActivateFn = () => {
  const state = inject(EmployeeStateService);
  const router = inject(Router);

  if (state.isAuthenticated()) {
    return router.createUrlTree(['/employees']);
  }

  return true;
};
