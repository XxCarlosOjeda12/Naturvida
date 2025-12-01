import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orden } from '../../../core/models/pos.models';

@Component({
  selector: 'app-pos-orden-detalle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4" *ngIf="orden">
      <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" (click)="close.emit()"></div>
      
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
        
        <div class="bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <h2 class="text-2xl font-bold text-gray-800">Orden #{{ orden.numeroOrden }}</h2>
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    [ngClass]="badgeColor(orden.estado)">
                {{ orden.estado }}
              </span>
            </div>
            <p class="text-gray-500 text-sm">ID Transacción: <span class="font-mono text-gray-700">{{ orden.id }}</span></p>
          </div>
          <button (click)="close.emit()" class="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <div class="p-8 overflow-y-auto flex-1 bg-gray-50/50">
          
          <div class="grid grid-cols-2 gap-6 mb-8">
            <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Detalles del Cliente</h3>
              <div class="space-y-2">
                <p class="flex items-center gap-2 text-gray-700"><i class="fas fa-user w-5 text-gray-400"></i> {{ orden.cliente }}</p>
                <p class="flex items-center gap-2 text-gray-700"><i class="fas fa-calendar w-5 text-gray-400"></i> {{ orden.fecha | date:'fullDate' }}</p>
                <p class="flex items-center gap-2 text-gray-700"><i class="fas fa-clock w-5 text-gray-400"></i> {{ orden.hora }}</p>
              </div>
            </div>

            <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Información de Pago</h3>
              <div class="space-y-2">
                <p class="flex items-center gap-2 text-gray-700 capitalize">
                  <i class="fas fa-wallet w-5 text-gray-400"></i> {{ orden.metodoPago }}
                </p>
                <p class="flex items-center gap-2 text-gray-700 font-mono">
                  <i class="fas fa-receipt w-5 text-gray-400"></i> {{ orden.numeroTicket || 'Pendiente' }}
                </p>
                <p class="flex items-center gap-2 text-gray-700">
                  <i class="fas fa-store w-5 text-gray-400"></i> Mostrador Principal
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
            <table class="w-full text-sm text-left">
              <thead class="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
                <tr>
                  <th class="px-6 py-3">Producto</th>
                  <th class="px-6 py-3 text-center">Cant.</th>
                  <th class="px-6 py-3 text-right">Precio</th>
                  <th class="px-6 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr *ngFor="let prod of orden.productos">
                  <td class="px-6 py-4">
                    <p class="font-bold text-gray-800">{{ prod.nombre }}</p>
                    <p class="text-xs text-gray-400">{{ prod.sku }}</p>
                  </td>
                  <td class="px-6 py-4 text-center font-mono">{{ prod.cantidad }}</td>
                  <td class="px-6 py-4 text-right text-gray-600">\${{ prod.precio.toFixed(2) }}</td>
                  <td class="px-6 py-4 text-right font-bold text-gray-800">\${{ prod.subtotal.toFixed(2) }}</td>
                </tr>
              </tbody>
              <tfoot class="bg-gray-50">
                <tr>
                  <td colspan="3" class="px-6 py-3 text-right text-gray-600">Subtotal:</td>
                  <td class="px-6 py-3 text-right font-medium">\${{ orden.subtotal.toFixed(2) }}</td>
                </tr>
                <tr>
                  <td colspan="3" class="px-6 py-1 text-right text-gray-600">IVA (16%):</td>
                  <td class="px-6 py-1 text-right font-medium">\${{ orden.iva.toFixed(2) }}</td>
                </tr>
                <tr>
                  <td colspan="3" class="px-6 py-4 text-right font-bold text-lg text-gray-900">Total:</td>
                  <td class="px-6 py-4 text-right font-bold text-lg text-primary">\${{ orden.total.toFixed(2) }}</td>
                </tr>
              </tfoot>
            </table>
          </div>

        </div>

        <div class="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
          <button (click)="imprimirTicket()" class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors shadow-sm">
            <i class="fas fa-print mr-2"></i> Imprimir Ticket
          </button>
          
          <div class="flex gap-3">
             <button *ngIf="orden.estado !== 'entregada'" 
                     (click)="advance.emit(orden)"
                     class="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30 flex items-center">
               Avanzar Estado <i class="fas fa-arrow-right ml-2"></i>
             </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PosOrdenDetalleComponent {
  @Input({ required: true }) orden!: any; 
  @Output() close = new EventEmitter<void>();
  @Output() advance = new EventEmitter<any>();

  badgeColor(estado: string) {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'preparando': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'lista': return 'bg-green-100 text-green-800 border border-green-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  }

  imprimirTicket() {
    window.print();
  }
}