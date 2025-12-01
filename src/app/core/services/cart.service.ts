import { Injectable, signal, computed, effect } from '@angular/core';
import { Producto, ProductoCarrito } from '../models/natur-vida.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<ProductoCarrito[]>([]);

  public count = computed(() => this.cartItems().reduce((acc, item) => acc + item.cantidad, 0));
  public subtotal = computed(() => this.cartItems().reduce((acc, item) => acc + (item.cantidad * (item.precioDescuento || item.precio)), 0));

  constructor() {
    const saved = localStorage.getItem('naturvida_cart');
    if (saved) {
      try {
        this.cartItems.set(JSON.parse(saved));
      } catch (e) {
        console.error('Error cargando carrito', e);
      }
    }

    effect(() => {
      localStorage.setItem('naturvida_cart', JSON.stringify(this.cartItems()));
    });
  }

  addToCart(producto: Producto, cantidad: number = 1) {
    this.cartItems.update(items => {
      const existing = items.find(item => item.id === producto.id);
      const precioFinal = producto.precioDescuento || producto.precio;

      if (existing) {
        return items.map(item => 
          item.id === producto.id 
            ? { ...item, cantidad: item.cantidad + cantidad, subtotalItem: (item.cantidad + cantidad) * precioFinal } 
            : item
        );
      }
      
      return [...items, { 
        ...producto, 
        cantidad, 
        subtotalItem: cantidad * precioFinal 
      }];
    });
  }

  getItems() {
    return this.cartItems.asReadonly();
  }

  updateQuantity(id: string, cantidad: number) {
    if (cantidad <= 0) {
      this.removeFromCart(id);
      return;
    }
    
    this.cartItems.update(items => 
      items.map(item => {
        if (item.id === id) {
          const precioFinal = item.precioDescuento || item.precio;
          return { ...item, cantidad, subtotalItem: cantidad * precioFinal };
        }
        return item;
      })
    );
  }

  removeFromCart(id: string) {
    this.cartItems.update(items => items.filter(item => item.id !== id));
  }

  clearCart() {
    this.cartItems.set([]);
  }
}