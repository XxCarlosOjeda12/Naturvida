import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-order-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop Oscuro con Blur -->
      <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" (click)="close.emit()"></div>
      
      <!-- Modal Card -->
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-scale-in">
        
        <!-- Header -->
        <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
          <div>
            <div class="flex items-center gap-3 mb-1">
                <h2 class="text-2xl font-bold text-gray-800">Orden {{ orden.id }}</h2>
                <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
                      [ngClass]="getStatusColor(orden.status)">
                    {{ orden.status }}
                </span>
            </div>
            <p class="text-sm text-gray-500 flex items-center gap-2">
                <i class="far fa-calendar"></i> {{ orden.date | date:'fullDate' }} 
                <span class="text-gray-300">|</span> 
                <i class="far fa-clock"></i> {{ orden.date | date:'shortTime' }}
            </p>
          </div>
          
          <button (click)="close.emit()" class="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-8 overflow-y-auto flex-1 custom-scroll">
            
            <!-- Grid Info Cliente -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <!-- Cliente -->
                <div class="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Datos del Cliente</h3>
                    <div class="flex items-center gap-3 mb-3">
                        <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm">
                            <i class="fas fa-user"></i>
                        </div>
                        <div>
                            <p class="font-bold text-gray-800 text-sm">{{ orden.customer }}</p>
                            <p class="text-xs text-primary font-medium">Cliente Frecuente</p>
                        </div>
                    </div>
                    <div class="space-y-1 text-sm text-gray-600">
                        <p><i class="fas fa-envelope w-5 text-gray-400"></i> {{ orden.email || 'No registrado' }}</p>
                        <p><i class="fas fa-phone w-5 text-gray-400"></i> +52 55 1234 5678</p>
                    </div>
                </div>

                <!-- Envío / Pago -->
                <div class="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Detalles de Entrega</h3>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-500">Canal:</span>
                            <span class="font-bold text-gray-800 flex items-center gap-2">
                                <i class="fas" [ngClass]="orden.channel === 'Online' ? 'fa-globe text-blue-500' : 'fa-store text-purple-500'"></i>
                                {{ orden.channel }}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Método de Pago:</span>
                            <span class="font-bold text-gray-800">Tarjeta de Crédito •••• 4242</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Dirección:</span>
                            <span class="font-bold text-gray-800 text-right w-1/2 truncate">Av. Reforma 222, CDMX</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabla de Productos -->
            <h3 class="text-lg font-bold text-gray-800 mb-4">Productos</h3>
            <div class="border border-gray-200 rounded-xl overflow-hidden mb-6">
                <table class="w-full text-left text-sm">
                    <thead class="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200">
                        <tr>
                            <th class="px-5 py-3">Item</th>
                            <th class="px-5 py-3 text-center">Cant.</th>
                            <th class="px-5 py-3 text-right">Precio</th>
                            <th class="px-5 py-3 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <!-- Mockeamos productos si no vienen en la orden para el ejemplo -->
                        @for (prod of (orden.products || mockProducts); track $index) {
                            <tr class="hover:bg-gray-50/50">
                                <td class="px-5 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                                            <i class="fas fa-box"></i>
                                        </div>
                                        <div>
                                            <p class="font-bold text-gray-800">{{ prod.name }}</p>
                                            <p class="text-xs text-gray-500">SKU: {{ prod.sku }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-5 py-4 text-center text-gray-600 font-mono">{{ prod.quantity }}</td>
                                <td class="px-5 py-4 text-right text-gray-600">\${{ prod.price }}</td>
                                <td class="px-5 py-4 text-right font-bold text-gray-800">\${{ prod.price * prod.quantity }}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>

            <!-- Totales -->
            <div class="flex justify-end">
                <div class="w-full md:w-1/2 space-y-3">
                    <div class="flex justify-between text-gray-500 text-sm">
                        <span>Subtotal</span>
                        <span class="font-medium">\${{ (orden.total * 0.84) | number:'1.2-2' }}</span>
                    </div>
                    <div class="flex justify-between text-gray-500 text-sm">
                        <span>Envío</span>
                        <span class="font-medium">$0.00</span>
                    </div>
                    <div class="flex justify-between text-gray-500 text-sm pb-3 border-b border-gray-100">
                        <span>IVA (16%)</span>
                        <span class="font-medium">\${{ (orden.total * 0.16) | number:'1.2-2' }}</span>
                    </div>
                    <div class="flex justify-between items-center pt-2">
                        <span class="font-bold text-xl text-gray-800">Total</span>
                        <span class="font-bold text-2xl text-primary">\${{ orden.total | number:'1.2-2' }}</span>
                    </div>
                </div>
            </div>

        </div>

        <!-- Footer Actions -->
        <div class="px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <button class="text-gray-500 hover:text-gray-800 font-medium text-sm flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200/50 transition-colors">
                <i class="fas fa-print"></i> Imprimir Recibo
            </button>
            <button (click)="close.emit()" class="bg-gray-800 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-gray-400/20 transition-all transform hover:-translate-y-0.5">
                Cerrar Detalle
            </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
    .animate-scale-in { animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    
    .custom-scroll::-webkit-scrollbar { width: 6px; }
    .custom-scroll::-webkit-scrollbar-track { background: transparent; }
    .custom-scroll::-webkit-scrollbar-thumb { background-color: #e5e7eb; border-radius: 20px; }
  `]
})
export class AdminOrderDetailComponent {
  @Input({ required: true }) orden: any;
  @Output() close = new EventEmitter<void>();

  // Mock de productos por si la orden no trae detalle
  mockProducts = [
    { name: 'Aceite Esencial de Lavanda', sku: 'LAV-001', price: 250, quantity: 2 },
    { name: 'Jabón de Avena Artesanal', sku: 'JAB-003', price: 85, quantity: 1 },
    { name: 'Bolsa Ecológica NaturVida', sku: 'BOL-001', price: 45, quantity: 1 },
  ];

  getStatusColor(status: string) {
    switch(status) {
        case 'Completado': return 'bg-green-50 text-green-700 border-green-200';
        case 'Pendiente': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        case 'Procesando': return 'bg-blue-50 text-blue-700 border-blue-200';
        default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  }
}