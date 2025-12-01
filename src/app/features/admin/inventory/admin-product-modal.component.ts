import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" (click)="close.emit()"></div>
      
      <!-- Modal Card -->
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up">
        
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 class="text-xl font-bold text-gray-800">
            {{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}
          </h2>
          <button (click)="close.emit()" class="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 overflow-y-auto">
          <form class="space-y-6">
            
            <!-- Imagen Preview & Upload -->
            <div class="flex flex-col items-center justify-center gap-4 mb-6">
                <div class="w-32 h-32 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group cursor-pointer hover:border-primary transition-colors">
                    <img *ngIf="product.image" [src]="product.image" class="w-full h-full object-cover">
                    <div *ngIf="!product.image" class="text-gray-400 text-center p-2">
                        <i class="fas fa-camera text-2xl mb-1"></i>
                        <p class="text-xs">Subir Imagen</p>
                    </div>
                    <!-- Overlay Hover -->
                    <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium text-xs">
                        Cambiar
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Nombre -->
                <div class="space-y-1">
                    <label class="text-xs font-bold text-gray-500 uppercase tracking-wide">Nombre del Producto</label>
                    <input type="text" [(ngModel)]="product.name" name="name" 
                           class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-800 font-medium"
                           placeholder="Ej. Aceite de Lavanda">
                </div>

                <!-- SKU -->
                <div class="space-y-1">
                    <label class="text-xs font-bold text-gray-500 uppercase tracking-wide">SKU / Código</label>
                    <input type="text" [(ngModel)]="product.sku" name="sku" 
                           class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-800 font-medium font-mono"
                           placeholder="Ej. LAV-001">
                </div>

                <!-- Precio -->
                <div class="space-y-1">
                    <label class="text-xs font-bold text-gray-500 uppercase tracking-wide">Precio ($)</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input type="number" [(ngModel)]="product.price" name="price" 
                               class="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-800 font-medium"
                               placeholder="0.00">
                    </div>
                </div>

                <!-- Stock -->
                <div class="space-y-1">
                    <label class="text-xs font-bold text-gray-500 uppercase tracking-wide">Stock Inicial</label>
                    <input type="number" [(ngModel)]="product.stock" name="stock" 
                           class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-800 font-medium"
                           placeholder="0">
                </div>

                <!-- Categoría -->
                <div class="space-y-1 md:col-span-2">
                    <label class="text-xs font-bold text-gray-500 uppercase tracking-wide">Categoría</label>
                    <select [(ngModel)]="product.category" name="category" 
                            class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-800 font-medium bg-white">
                        <option value="">Seleccionar Categoría...</option>
                        <option value="aceites">Aceites Esenciales</option>
                        <option value="suplementos">Suplementos</option>
                        <option value="cosmetica">Cosmética Natural</option>
                        <option value="alimentos">Alimentos</option>
                    </select>
                </div>
                
                <!-- Descripción -->
                <div class="space-y-1 md:col-span-2">
                    <label class="text-xs font-bold text-gray-500 uppercase tracking-wide">Descripción Corta</label>
                    <textarea [(ngModel)]="product.description" name="description" rows="3"
                              class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-800 text-sm resize-none"
                              placeholder="Breve descripción para la tienda..."></textarea>
                </div>
            </div>

          </form>
        </div>

        <!-- Footer Actions -->
        <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <button (click)="close.emit()" 
                    class="px-6 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-colors">
                Cancelar
            </button>
            <button (click)="save()" 
                    class="px-6 py-2.5 bg-gray-800 text-white font-bold rounded-xl hover:bg-black shadow-lg shadow-gray-400/20 transition-all flex items-center gap-2">
                <i class="fas fa-save"></i>
                Guardar Producto
            </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .animate-fade-in-up { animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  `]
})
export class AdminProductModalComponent {
  @Input() productData: any = null;  
  @Output() close = new EventEmitter<void>();
  @Output() saveProduct = new EventEmitter<any>();

  isEditing = false;
  
  product = {
    name: '',
    sku: '',
    price: null,
    stock: null,
    category: '',
    description: '',
    image: ''  
  };

  ngOnInit() {
    if (this.productData) {
      this.isEditing = true;
      this.product = { ...this.productData };
    }
  }

  save() {
    // Aquí irían validaciones
    this.saveProduct.emit(this.product);
    this.close.emit();
  }
}