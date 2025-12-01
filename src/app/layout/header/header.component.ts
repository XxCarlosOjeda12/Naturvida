import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Barra de Promoción -->
    <div class="bg-gray-50 text-[11px] md:text-xs text-center py-2 text-gray-500 font-medium tracking-wide border-b border-gray-100">
      🌿 Envío gratis > $500 MXN | 🚚 Recoge en tienda sin costo
    </div>

    <!-- Header Principal -->
    <header class="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Sección Superior: Logo, Buscador, Acciones -->
        <div class="flex items-center justify-between h-20 gap-4 md:gap-8">
          
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-2.5 flex-shrink-0 group">
            <i class="fas fa-leaf text-3xl text-primary group-hover:scale-110 transition-transform duration-300"></i>
            <span class="text-2xl font-bold text-dark tracking-tight">NaturVida</span>
          </a>

          <!-- Buscador (Visible en Desktop) -->
          <div class="hidden md:flex flex-1 max-w-xl relative group">
            <input type="text" 
                   placeholder="Buscar productos naturales..." 
                   class="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-12 pr-4 text-sm text-gray-700 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all group-hover:bg-white group-hover:shadow-sm">
            <i class="fas fa-search absolute left-4.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"></i>
          </div>

          <!-- Acciones -->
          <div class="flex items-center gap-4 md:gap-6">
            
            <!-- Usuario -->
            <div class="relative group cursor-pointer flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
               <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                 <i class="far fa-user text-sm"></i>
               </div>
               <span class="text-sm font-bold hidden sm:block">Mi Cuenta</span>
               <i class="fas fa-chevron-down text-[10px] opacity-50 hidden sm:block"></i>
               
               <!-- Dropdown Menú -->
               <div class="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50 overflow-hidden">
                  <div class="py-1">
                    <a routerLink="/login" class="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">
                      <i class="fas fa-sign-in-alt w-5 opacity-50"></i> Iniciar Sesión
                    </a>
                    <a routerLink="/registro" class="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary font-medium">
                      <i class="fas fa-user-plus w-5 opacity-50"></i> Registrarse
                    </a>
                    <div class="h-px bg-gray-100 my-1"></div>
                    <a routerLink="/admin/login" class="block px-4 py-2 text-xs text-gray-400 hover:text-dark hover:bg-gray-50">Acceso Admin</a>
                    <a routerLink="/pos-login" class="block px-4 py-2 text-xs text-gray-400 hover:text-dark hover:bg-gray-50">Acceso Empleados</a>
                  </div>
               </div>
            </div>

            <!-- Carrito -->
            <a routerLink="/carrito" class="relative group text-gray-500 hover:text-primary transition-colors">
              <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                 <i class="fas fa-shopping-cart text-sm"></i>
              </div>
              @if (cartCount() > 0) {
                <span class="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce-in">
                  {{ cartCount() }}
                </span>
              }
            </a>

            <!-- Menu Móvil Toggle -->
            <button class="md:hidden w-8 h-8 flex items-center justify-center text-gray-500">
                <i class="fas fa-bars text-xl"></i>
            </button>

          </div>
        </div>

        <nav class="hidden md:flex items-center justify-center gap-8 pb-0.5 overflow-x-auto scrollbar-hide">
            
            <a routerLink="/productos" 
               routerLinkActive="text-primary font-bold border-b-2 border-primary"
               [routerLinkActiveOptions]="{exact: true}"
               class="py-3 text-sm font-medium text-gray-500 hover:text-primary transition-all whitespace-nowrap border-b-2 border-transparent">
               Ver Todo
            </a>

            <a routerLink="/productos" [queryParams]="{cat: 'aceites'}"
               routerLinkActive="text-primary font-bold border-b-2 border-primary"
               class="py-3 text-sm font-medium text-gray-500 hover:text-primary transition-all whitespace-nowrap border-b-2 border-transparent flex items-center gap-2 group">
               <i class="fas fa-tint text-xs opacity-50 group-hover:opacity-100 transition-opacity"></i> 
               Aceites Esenciales
            </a>

            <a routerLink="/productos" [queryParams]="{cat: 'suplementos'}"
               routerLinkActive="text-primary font-bold border-b-2 border-primary"
               class="py-3 text-sm font-medium text-gray-500 hover:text-primary transition-all whitespace-nowrap border-b-2 border-transparent flex items-center gap-2 group">
               <i class="fas fa-capsules text-xs opacity-50 group-hover:opacity-100 transition-opacity"></i> 
               Suplementos
            </a>

            <a routerLink="/productos" [queryParams]="{cat: 'cosmetica'}"
               routerLinkActive="text-primary font-bold border-b-2 border-primary"
               class="py-3 text-sm font-medium text-gray-500 hover:text-primary transition-all whitespace-nowrap border-b-2 border-transparent flex items-center gap-2 group">
               <i class="fas fa-spa text-xs opacity-50 group-hover:opacity-100 transition-opacity"></i> 
               Cosmética Natural
            </a>

            <a routerLink="/productos" [queryParams]="{cat: 'superfoods'}"
               routerLinkActive="text-primary font-bold border-b-2 border-primary"
               class="py-3 text-sm font-medium text-gray-500 hover:text-primary transition-all whitespace-nowrap border-b-2 border-transparent flex items-center gap-2 group">
               <i class="fas fa-apple-alt text-xs opacity-50 group-hover:opacity-100 transition-opacity"></i> 
               Superfoods
            </a>

        </nav>

      </div>
    </header>
  `,
  styles: [`
    @keyframes bounceIn {
      0% { transform: scale(0); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    .animate-bounce-in { animation: bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  `]
})
export class HeaderComponent {
  private cartService = inject(CartService); 
    cartCount = this.cartService.count;
}
