import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const PosGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isEmpleado = localStorage.getItem('naturvida_pos_empleado');
  
  if (isEmpleado === 'true') {
    return true;
  }
  
  router.navigate(['/pos-login']);
  return false;
};
