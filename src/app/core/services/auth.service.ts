import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/natur-vida.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<Usuario | null>(this.getUserFromStorage());

  constructor(private router: Router) {}

  private getUserFromStorage(): Usuario | null {
    const savedUser = localStorage.getItem('naturvida_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Error al recuperar sesión', e);
        localStorage.removeItem('naturvida_user');
        return null;
      }
    }
    return null;
  }

  login(email: string, nombre: string) {
    const user: Usuario = {
      id: 'USR-' + Math.floor(Math.random() * 100000),
      email: email,
      nombre: nombre,
      fechaRegistro: new Date()
    };

    this.currentUser.set(user);
    localStorage.setItem('naturvida_user', JSON.stringify(user));
    return true;
  }

  async register(userData: { nombre: string; email: string; telefono?: string; direccion?: string }): Promise<void> {
    const newUser: Usuario = {
      id: 'USR-' + Date.now(),
      nombre: userData.nombre,
      email: userData.email,
      telefono: userData.telefono,
      direccion: userData.direccion,
      fechaRegistro: new Date()
    };

    localStorage.setItem('naturvida_user', JSON.stringify(newUser));
    this.currentUser.set(newUser);
    return Promise.resolve();
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('naturvida_user');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }
}