import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Producto } from '../../core/models/natur-vida.models';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="min-h-screen py-12"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="text-primary font-bold tracking-wide uppercase text-sm">Nuestro Catálogo</span>
          <h2 class="text-3xl md:text-4xl font-bold text-dark mt-2 mb-4">Productos Naturales</h2>
          <p class="text-medium text-lg">Explora nuestra selección de productos orgánicos pensados para tu bienestar.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <ng-container *ngIf="productos$ | async as productos; else cargando">
            <app-product-card 
              *ngFor="let prod of productos" 
              [producto]="prod"
              (addToCart)="agregarAlCarrito(prod)">
            </app-product-card>
          </ng-container>

          <ng-template #cargando>
            <div *ngFor="let item of [1,2,3,4,5]" class="animate-pulse bg-gray-100 rounded-2xl h-96"></div>
          </ng-template>

        </div>
      </div>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  productos$!: Observable<Producto[]>;

  ngOnInit() {
    this.productos$ = this.productService.getProductos();
  }

  agregarAlCarrito(producto: Producto) {
    this.cartService.addToCart(producto);
    console.log('Agregado:', producto.nombre);
  }
}