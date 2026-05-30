import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  // 🔥 validar si existe window (browser)
  if (typeof window === 'undefined') {
    return false;
  }

  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  window.location.href = '/login';
  return false;
};