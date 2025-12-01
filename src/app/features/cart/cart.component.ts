import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-dark mb-8">Tu Carrito de Compras</h1>

        <div *ngIf="cartItems().length === 0" class="text-center py-20 bg-gray-50 rounded-3xl border border-light dashed-border">
          <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <i class="fas fa-shopping-basket text-4xl text-gray-300"></i>
          </div>
          <h2 class="text-2xl font-bold text-dark mb-2">Tu carrito está vacío</h2>
          <p class="text-medium mb-8">¡Aprovecha nuestras ofertas naturales hoy!</p>
          <button routerLink="/productos" class="bg-primary text-white font-bold py-3 px-10 rounded-full hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Ver Productos
          </button>
        </div>

        <div *ngIf="cartItems().length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div class="lg:col-span-2 space-y-6">
            <div *ngFor="let item of cartItems()" class="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border border-light rounded-2xl shadow-sm hover:shadow-card transition-shadow">
              
              <img [src]="item.imagen" [alt]="item.nombre" class="w-24 h-24 object-cover rounded-xl bg-gray-100">
              
              <div class="flex-1 text-center sm:text-left">
                <h3 class="font-bold text-dark text-lg">{{ item.nombre }}</h3>
                <p class="text-medium text-sm mb-1">{{ item.categoria }}</p>
                <div class="text-primary font-bold">{{ (item.precioDescuento || item.precio) | currency }}</div>
              </div>

              <div class="flex items-center border-2 border-light rounded-full">
                <button (click)="updateQty(item.id, item.cantidad - 1)" class="w-10 h-10 flex items-center justify-center text-medium hover:text-primary font-bold text-lg">-</button>
                <span class="w-8 text-center font-bold text-dark text-sm">{{ item.cantidad }}</span>
                <button (click)="updateQty(item.id, item.cantidad + 1)" class="w-10 h-10 flex items-center justify-center text-medium hover:text-primary font-bold text-lg">+</button>
              </div>

              <div class="text-right min-w-[100px]">
                <div class="font-bold text-dark text-lg mb-2">{{ item.subtotalItem | currency }}</div>
                <button (click)="removeItem(item.id)" class="text-red-500 text-xs font-bold hover:text-red-700 flex items-center justify-end gap-1">
                  <i class="fas fa-trash"></i> Eliminar
                </button>
              </div>
            </div>
          </div>

          <div class="lg:col-span-1">
            <div class="bg-gray-50 p-8 rounded-3xl border border-light sticky top-24 shadow-sm">
              <h3 class="text-xl font-bold text-dark mb-6">Resumen del Pedido</h3>
              
              <div class="space-y-4 mb-6 border-b border-gray-200 pb-6">
                <div class="flex justify-between text-medium">
                  <span>Subtotal</span>
                  <span>{{ subtotal() | currency }}</span>
                </div>
                <div class="flex justify-between text-medium">
                  <span>Envío estimado</span>
                  <span class="text-primary font-bold">Gratis</span>
                </div>
              </div>

              <div class="flex justify-between items-center mb-8">
                <span class="text-xl font-bold text-dark">Total</span>
                <span class="text-3xl font-bold text-primary">{{ subtotal() | currency }}</span>
              </div>

              <button (click)="procesarPago()" 
                      class="w-full bg-primary text-white font-bold py-4 rounded-full hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl active:scale-95 mb-4 text-lg flex justify-center items-center gap-2">
                <i class="fas fa-lock text-sm"></i> Proceder al Pago
              </button>
              
              <button routerLink="/productos" class="w-full text-medium font-bold text-sm hover:text-primary transition-colors text-center underline">
                Seguir comprando
              </button>

              <div class="mt-6 text-xs text-center text-gray-400">
                <p><i class="fas fa-shield-alt mr-1"></i> Pago 100% Seguro</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class CartComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  
  cartItems = this.cartService.getItems();
  subtotal = this.cartService.subtotal;

  updateQty(id: string, qty: number) {
    this.cartService.updateQuantity(id, qty);
  }

  removeItem(id: string) {
    this.cartService.removeFromCart(id);
  }

  procesarPago() {
    if (!this.authService.isLoggedIn()) {
      const confirmar = confirm("Necesitas iniciar sesión para completar la compra. ¿Ir al login?");
      if (confirmar) {
        this.router.navigate(['/login']);
      }
      return;
    }

    const usuario = this.authService.currentUser()!;
    const nuevaOrden = this.orderService.crearOrden(
      usuario,
      this.cartItems(),
      this.subtotal()
    );

    this.cartService.clearCart();
    alert(`¡Compra exitosa!\n\nGracias ${usuario.nombre}, tu pedido #${nuevaOrden.numeroOrden} ha sido confirmado.`);
    
    this.router.navigate(['/']);
  }
}