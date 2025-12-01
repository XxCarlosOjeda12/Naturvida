import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="sticky top-0 z-50 bg-white shadow-md font-sans">
      <div class="bg-primary/10 text-center py-2 text-xs md:text-sm text-dark font-medium">
        <p>🌿 Envío gratis > $500 MXN | 🚚 Recoge en tienda sin costo</p>
      </div>

      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-20">
          
          <a routerLink="/" class="flex items-center gap-2 group">
            <i class="fas fa-leaf text-primary text-3xl group-hover:rotate-12 transition-transform"></i>
            <span class="text-2xl font-bold text-dark tracking-tight">NaturVida</span>
          </a>

          <div class="hidden md:block flex-1 max-w-lg mx-8">
            <div class="relative group">
              <input type="text" 
                     placeholder="Buscar productos naturales..."
                     class="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
              <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary"></i>
            </div>
          </div>

          <div class="flex items-center gap-4 md:gap-6">
            
            <div class="relative group cursor-pointer">
              <div class="flex items-center gap-2 text-dark hover:text-primary transition-colors py-2">
                <i class="fas fa-user-circle text-2xl"></i>
                <span class="hidden md:inline font-medium text-sm">
                  {{ authService.currentUser()?.nombre || 'Mi Cuenta' }}
                </span>
                <i class="fas fa-chevron-down text-xs hidden md:block opacity-50"></i>
              </div>
              
              <div class="absolute right-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                <div class="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                  <ng-container *ngIf="!authService.currentUser()">
                    <div class="p-4 space-y-2">
                      <a routerLink="/login" class="block w-full text-center bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">Iniciar Sesión</a>
                      <a routerLink="/registro" class="block w-full text-center border border-gray-200 text-dark py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Crear Cuenta</a>
                    </div>
                  </ng-container>
                  
                  <ng-container *ngIf="authService.currentUser()">
                    <div class="py-2">
                      <a routerLink="/perfil" class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary">
                        <i class="fas fa-id-card w-5"></i> Mi Perfil
                      </a>
                      <a routerLink="/mis-ordenes" class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary">
                        <i class="fas fa-box-open w-5"></i> Mis Pedidos
                      </a>
                      <div class="border-t border-gray-100 my-1"></div>
                      <button (click)="authService.logout()" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <i class="fas fa-sign-out-alt w-5"></i> Cerrar Sesión
                      </button>
                    </div>
                  </ng-container>
                </div>
              </div>
            </div>

            <a routerLink="/carrito" class="relative group p-2">
              <i class="fas fa-shopping-cart text-2xl text-dark group-hover:text-primary transition-colors"></i>
              <span *ngIf="cartCount() > 0" 
                    class="absolute top-0 right-0 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white animate-pulse-once">
                {{ cartCount() }}
              </span>
            </a>

            <button class="md:hidden text-dark text-2xl">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>

      <nav class="hidden md:block bg-white border-t border-gray-100">
        <div class="container mx-auto px-4">
          <ul class="flex items-center gap-8 text-sm font-medium text-gray-600">
            <li>
              <a routerLink="/productos" class="py-3 block hover:text-primary border-b-2 border-transparent hover:border-primary transition-all">
                Ver Todo
              </a>
            </li>
            <li *ngFor="let cat of categorias" class="group relative">
              <a [routerLink]="['/productos', cat.id]" class="py-3 block hover:text-primary border-b-2 border-transparent hover:border-primary transition-all flex items-center gap-2">
                <i [class]="cat.icono"></i> {{ cat.nombre }}
              </a>
              </li>
          </ul>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  authService = inject(AuthService);
  cartService = inject(CartService);

  cartCount = this.cartService.count;

  // Datos mock para el menú (idealmente vendrían de un CategoryService)
  categorias = [
    { id: 'aceites', nombre: 'Aceites Esenciales', icono: 'fas fa-tint' },
    { id: 'suplementos', nombre: 'Suplementos', icono: 'fas fa-pills' },
    { id: 'cosmetica', nombre: 'Cosmética Natural', icono: 'fas fa-spa' },
    { id: 'alimentos', nombre: 'Superfoods', icono: 'fas fa-apple-alt' }
  ];
}