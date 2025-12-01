import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Producto } from '../../../core/models/natur-vida.models';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="group relative bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden h-full flex flex-col">
      
      <div class="absolute top-3 left-3 z-10 flex flex-col gap-2">
        <span *ngIf="producto.nuevo" 
              class="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
          NUEVO
        </span>
        <span *ngIf="producto.precioDescuento" 
              class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
          OFERTA
        </span>
      </div>

      <div class="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button class="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:bg-white transition-colors text-medium hover:text-red-500">
          <i class="fas fa-heart"></i>
        </button>
      </div>

      <div class="relative aspect-square overflow-hidden bg-gray-100">
        <img [src]="producto.imagen" 
             [alt]="producto.nombre"
             class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <button [routerLink]="['/producto', producto.id]"
                  class="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-dark px-6 py-2 rounded-full font-medium shadow-lg hover:bg-primary hover:text-white">
            Vista Rápida
          </button>
        </div>
      </div>

      <div class="p-5 flex flex-col flex-grow space-y-3">
        <p class="text-xs text-medium">SKU: {{ producto.sku }}</p>
        
        <h3 class="font-semibold text-dark text-lg line-clamp-2 min-h-[3.5rem]">
          <a [routerLink]="['/producto', producto.id]" class="hover:text-primary transition-colors">
            {{ producto.nombre }}
          </a>
        </h3>
        
        <p class="text-sm text-medium line-clamp-2 flex-grow">
          {{ producto.descripcionCorta }}
        </p>
        
        <div class="flex gap-2 flex-wrap mt-2">
          <span *ngFor="let etiqueta of producto.etiquetas.slice(0, 2)" 
                class="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium capitalize">
            {{ etiqueta }}
          </span>
        </div>
        
        <div class="pt-4 border-t border-light mt-auto">
          <div class="flex items-center justify-between mb-3">
            <div class="flex flex-col">
              <span class="text-2xl font-bold text-primary">
                {{ (producto.precioDescuento || producto.precio) | currency:'USD':'symbol':'1.0-0' }}
              </span>
              <span *ngIf="producto.precioDescuento" class="text-xs text-medium line-through">
                {{ producto.precio | currency:'USD':'symbol':'1.0-0' }}
              </span>
            </div>
            
            <div class="text-right">
              <span *ngIf="producto.stock <= 5 && producto.stock > 0" class="text-xs text-orange-600 font-medium block">
                ¡Solo {{ producto.stock }}!
              </span>
              <span *ngIf="producto.stock === 0" class="text-xs text-red-600 font-bold uppercase block">
                Agotado
              </span>
            </div>
          </div>
          
          <button [disabled]="producto.stock === 0"
                  (click)="onAddToCart(producto)"
                  class="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95">
            <i class="fas fa-shopping-cart group-hover:animate-bounce"></i>
            <span>{{ producto.stock === 0 ? 'Sin Stock' : 'Agregar' }}</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input({ required: true }) producto!: Producto;
  @Output() addToCart = new EventEmitter<Producto>();

  onAddToCart(item: Producto) {
    this.addToCart.emit(item);
  }
}