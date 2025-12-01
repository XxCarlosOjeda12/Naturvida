import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { AdminProductModalComponent } from './admin-product-modal.component';
import { AdminConfirmModalComponent } from '../shared/admin-confirm-modal.component';

@Component({
  selector: 'app-admin-inventory',
  standalone: true,
  imports: [CommonModule, AdminProductModalComponent, AdminConfirmModalComponent], 
  template: `
    <div class="h-full flex flex-col p-8 bg-gray-50/50">
      
      <!-- Toolbar -->
      <div class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h1 class="text-2xl font-bold text-gray-800">Inventario</h1>
            <p class="text-sm text-gray-500">Gestión de catálogo y stock</p>
        </div>
        
        <div class="flex gap-3 w-full md:w-auto">
          <!-- Buscador -->
          <div class="relative flex-1 md:w-64">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Buscar producto..." 
              class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
              (input)="filterText.set($any($event.target).value)"
            >
          </div>
          
          <!-- Botón Nuevo -->
          <button (click)="openModal()" 
                  class="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-primary/30 flex items-center gap-2 font-bold hover:-translate-y-0.5">
            <i class="fas fa-plus"></i>
            <span class="hidden sm:inline">Nuevo</span>
          </button>
        </div>
      </div>

      <!-- Tabla -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
            <thead class="bg-gray-50 border-b border-gray-100">
                <tr>
                <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Producto</th>
                <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Categoría</th>
                <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Precio</th>
                <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Stock</th>
                <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Estado</th>
                <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Acciones</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
                @for (product of filteredProducts(); track product.id) {
                <tr class="hover:bg-gray-50/80 transition-colors group">
                    <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <img [src]="product.imagen || 'assets/placeholder.png'" class="w-10 h-10 rounded-lg object-cover border border-gray-100 bg-white">
                        <div>
                        <p class="font-bold text-gray-800 text-sm">{{ product.nombre }}</p>
                        <p class="text-xs text-gray-400 font-mono">SKU: {{ product.id }}</p>
                        </div>
                    </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-600">{{ product.categoria || 'General' }}</td>
                    <td class="px-6 py-4 text-right font-bold text-gray-800">\${{ product.precio }}</td>
                    <td class="px-6 py-4 text-center">
                    <span class="px-2.5 py-1 rounded-lg text-xs font-bold"
                        [ngClass]="{
                        'bg-green-100 text-green-700': product.stock > 20,
                        'bg-yellow-100 text-yellow-700': product.stock <= 20 && product.stock > 5,
                        'bg-red-100 text-red-700': product.stock <= 5
                        }">
                        {{ product.stock }} u.
                    </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                        <div class="w-2.5 h-2.5 rounded-full bg-green-500 mx-auto shadow-sm shadow-green-500/50"></div>
                    </td>
                    <td class="px-6 py-4 text-right">
                    <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button (click)="openModal(product)" class="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <!-- Botón Eliminar con Trigger del Modal -->
                        <button (click)="confirmDelete(product)" class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    </td>
                </tr>
                }
            </tbody>
            </table>
        </div>
      </div>

    </div>

    <!-- MODAL DE PRODUCTO (Crear/Editar) -->
    @if (showModal()) {
        <app-admin-product-modal 
            [productData]="selectedProduct()"
            (close)="closeModal()"
            (saveProduct)="handleSave($event)">
        </app-admin-product-modal>
    }

    <!-- MODAL DE CONFIRMACIÓN (Eliminar) -->
    @if (showDeleteModal()) {
        <app-admin-confirm-modal
            title="¿Eliminar Producto?"
            [message]="'Estás a punto de eliminar permanently: ' + productToDelete()?.nombre + '. Esta acción no se puede deshacer.'"
            actionText="Eliminar"
            type="danger"
            (cancel)="cancelDelete()"
            (confirm)="executeDelete()">
        </app-admin-confirm-modal>
    }
  `
})
export class AdminInventoryComponent {
  private productService = inject(ProductService);
  
  products = toSignal(this.productService.getProductos(), { initialValue: [] });
  filterText = signal('');

  showModal = signal(false);
  selectedProduct = signal<any>(null);

  showDeleteModal = signal(false);
  productToDelete = signal<any>(null);

  filteredProducts = computed(() => {
    const text = this.filterText().toLowerCase();
    const allProducts = this.products();
    if (!text) return allProducts;
    return allProducts.filter(p => p.nombre.toLowerCase().includes(text));
  });

  openModal(product: any = null) {
    this.selectedProduct.set(product);
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.selectedProduct.set(null);
  }

  handleSave(product: any) {
    console.log('Producto guardado/editado:', product);
    // Aquí llamarías al servicio para guardar
  }

  confirmDelete(product: any) {
    this.productToDelete.set(product);
    this.showDeleteModal.set(true);
  }

  cancelDelete() {
    this.showDeleteModal.set(false);
    this.productToDelete.set(null);
  }

  executeDelete() {
    const product = this.productToDelete();
    if (product) {
      console.log('Eliminando producto:', product.id);
      // Aquí: this.productService.delete(product.id).subscribe(...)
      this.cancelDelete();
    }
  }
}