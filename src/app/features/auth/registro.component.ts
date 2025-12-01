import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div class="mx-auto h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
           <i class="fas fa-user-plus text-primary text-3xl"></i>
        </div>
        <h2 class="text-3xl font-extrabold text-dark">
          Crear cuenta
        </h2>
        <p class="mt-2 text-medium">
          Únete a NaturVida y empieza a cuidar de ti
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow-card rounded-2xl sm:px-10 border border-light">
          
          <form (ngSubmit)="onRegister()" class="space-y-6">
            
            <div>
              <label for="nombre" class="block text-sm font-bold text-dark mb-1">Nombre Completo <span class="text-red-500">*</span></label>
              <input type="text" name="nombre" [(ngModel)]="formData.nombre" required placeholder="María González"
                     class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
            </div>

            <div>
              <label for="email" class="block text-sm font-bold text-dark mb-1">Correo Electrónico <span class="text-red-500">*</span></label>
              <input type="email" name="email" [(ngModel)]="formData.email" required placeholder="maria@ejemplo.com"
                     class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
            </div>

            <div>
              <label for="telefono" class="block text-sm font-bold text-dark mb-1">Teléfono</label>
              <input type="tel" name="telefono" [(ngModel)]="formData.telefono" placeholder="55 1234 5678"
                     class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
            </div>

            <div>
              <label for="direccion" class="block text-sm font-bold text-dark mb-1">Dirección de envío</label>
              <textarea name="direccion" [(ngModel)]="formData.direccion" rows="2" placeholder="Calle, Número, Colonia..."
                     class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"></textarea>
            </div>

            <div>
              <button type="submit" [disabled]="!formData.email || !formData.nombre"
                      class="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95">
                Registrarme
              </button>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">¿Ya tienes cuenta?</span>
              </div>
            </div>
            <div class="mt-6 flex flex-col items-center space-y-3">
              <a routerLink="/login" class="text-primary font-bold hover:underline cursor-pointer">
                Inicia Sesión aquí
              </a>
              <a routerLink="/" class="text-medium text-sm hover:text-dark hover:underline cursor-pointer">
                Volver a la tienda
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class RegistroComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  formData = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  };

  async onRegister() {
    if (this.formData.email && this.formData.nombre) {
      try {
        await this.authService.register(this.formData);
        this.router.navigate(['/']);
      } catch (error) {
        console.error('Error en registro', error);
      }
    }
  }
}