import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};