import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Producto } from '../../core/models/natur-vida.models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <a routerLink="/productos" class="text-medium hover:text-primary flex items-center gap-2 text-sm font-medium">
          <i class="fas fa-arrow-left"></i> Volver al catálogo
        </a>
      </div>

      <div *ngIf="producto" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          <div class="bg-white rounded-3xl shadow-sm border border-light p-8 flex items-center justify-center aspect-square md:aspect-auto">
            <img [src]="producto.imagen" [alt]="producto.nombre" class="max-w-full max-h-[500px] object-contain hover:scale-105 transition-transform duration-500">
          </div>

          <div class="flex flex-col justify-center">
            <span class="text-primary font-bold tracking-wider uppercase text-sm mb-2">{{ producto.categoria }}</span>
            <h1 class="text-3xl md:text-4xl font-bold text-dark mb-4">{{ producto.nombre }}</h1>
            
            <div class="flex items-end gap-4 mb-6">
              <span class="text-4xl font-bold text-dark">{{ (producto.precioDescuento || producto.precio) | currency }}</span>
              <span *ngIf="producto.precioDescuento" class="text-xl text-medium line-through mb-1">{{ producto.precio | currency }}</span>
            </div>

            <p class="text-medium text-lg leading-relaxed mb-8">
              {{ producto.descripcion }}
            </p>

            <div class="flex flex-col sm:flex-row gap-4 mb-8">
              <div class="flex items-center border-2 border-light rounded-full w-max">
                <button (click)="cambiarCantidad(-1)" class="w-12 h-12 flex items-center justify-center text-medium hover:text-primary font-bold text-lg transition-colors">-</button>
                <span class="w-12 text-center font-bold text-dark text-lg">{{ cantidad }}</span>
                <button (click)="cambiarCantidad(1)" class="w-12 h-12 flex items-center justify-center text-medium hover:text-primary font-bold text-lg transition-colors">+</button>
              </div>

              <button (click)="agregarAlCarrito()" 
                      class="flex-1 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2">
                <i class="fas fa-shopping-bag"></i>
                Agregar al Carrito
              </button>
            </div>

            <div class="border-t border-light pt-6 space-y-3">
              <div class="flex items-center gap-3 text-medium">
                <i class="fas fa-check-circle text-primary"></i>
                <span>Stock disponible: {{ producto.stock }} unidades</span>
              </div>
              <div class="flex items-center gap-3 text-medium">
                <i class="fas fa-truck text-primary"></i>
                <span>Envío gratis en compras mayores a $999</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  producto?: Producto;
  cantidad = 1;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductoById(id).subscribe(p => {
        this.producto = p;
      });
    }
  }

  cambiarCantidad(delta: number) {
    const nueva = this.cantidad + delta;
    if (nueva >= 1 && nueva <= (this.producto?.stock || 10)) {
      this.cantidad = nueva;
    }
  }

  agregarAlCarrito() {
    if (this.producto) {
      this.cartService.addToCart(this.producto, this.cantidad);
      alert('Producto agregado al carrito');
    }
  }
}