import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Orden } from '../../../core/models/pos.models';
import { PosOrdenDetalleComponent } from './pos-orden-detalle.component';

@Component({
  selector: 'app-pos-ordenes',
  standalone: true,
  imports: [CommonModule, RouterLink, PosOrdenDetalleComponent],
  template: `
    <div class="min-h-screen bg-gray-100 p-6">
      <div class="container mx-auto">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold text-gray-800">
            <i class="fas fa-clipboard-list mr-2 text-primary"></i>Gestión de Órdenes
          </h1>
          <a routerLink="/pos/dashboard" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            <i class="fas fa-arrow-left mr-2"></i>Volver
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let orden of ordenes()" 
               class="bg-white rounded-xl shadow-lg p-6 border-l-4"
               [class.border-yellow-500]="orden.estado === 'pendiente'"
               [class.border-blue-500]="orden.estado === 'preparando'"
               [class.border-green-500]="orden.estado === 'lista'"
               [class.border-gray-400]="orden.estado === 'entregada'">
            
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-bold text-xl text-gray-800">{{ orden.numeroOrden }}</h3>
                <p class="text-sm text-gray-500">{{ orden.cliente }}</p>
                <p class="text-xs text-gray-400">{{ orden.hora }}</p>
              </div>
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase"
                    [class.bg-yellow-100]="orden.estado === 'pendiente'"
                    [class.text-yellow-800]="orden.estado === 'pendiente'"
                    [class.bg-blue-100]="orden.estado === 'preparando'"
                    [class.text-blue-800]="orden.estado === 'preparando'"
                    [class.bg-green-100]="orden.estado === 'lista'"
                    [class.text-green-800]="orden.estado === 'lista'"
                    [class.bg-gray-100]="orden.estado === 'entregada'"
                    [class.text-gray-600]="orden.estado === 'entregada'">
                {{ orden.estado }}
              </span>
            </div>

            <div class="border-t border-gray-100 pt-4 mb-4">
              <div *ngFor="let prod of orden.productos" class="flex justify-between text-sm mb-2">
                <span class="text-gray-600">{{ prod.cantidad }}x {{ prod.nombre }}</span>
                <span class="font-medium">\${{ prod.subtotal }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-gray-200">
              <span class="text-lg font-bold text-primary">\${{ orden.total.toFixed(2) }}</span>
              <div class="flex gap-2">
                <button (click)="ordenSeleccionada.set(orden)"
                        class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm">
                  <i class="fas fa-eye mr-1"></i>Ver
                </button>
                <button *ngIf="orden.estado !== 'entregada'" 
                        (click)="avanzarEstado(orden)"
                        class="bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded text-sm">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="ordenes().length === 0" class="text-center py-16">
          <i class="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
          <p class="text-gray-500 text-lg">No hay órdenes pendientes</p>
        </div>
      </div>
    </div>
    
    <!-- Modal de detalle -->
    <app-pos-orden-detalle 
      *ngIf="ordenSeleccionada()" 
      [orden]="ordenSeleccionada()"
      (close)="ordenSeleccionada.set(null)"
      (advance)="avanzarEstado($event); ordenSeleccionada.set(null)">
    </app-pos-orden-detalle>
  `
})
export class PosOrdenesComponent {
  ordenSeleccionada = signal<Orden | null>(null);
  
  // Datos hardcodeados de ejemplo 
  ordenes = signal<Orden[]>([
    {
      id: 'ORD-001-2024',
      numeroOrden: 'ORD-001',
      cliente: 'Cliente Mostrador',
      fecha: new Date().toISOString(),
      hora: '14:30',
      productos: [
        { id: '1', sku: 'ACE-001', nombre: 'Aceite de Lavanda', precio: 250, cantidad: 2, subtotal: 500, imagen: '/assets/images/productos/aceite-lavanda.jpg' }
      ],
      subtotal: 500,
      iva: 80,
      total: 580,
      metodoPago: 'efectivo',
      numeroTicket: 'TKT-001234',
      estado: 'pendiente'
    },
    {
      id: 'ORD-002-2024',
      numeroOrden: 'ORD-002',
      cliente: 'Pedido Web #142',
      fecha: new Date().toISOString(),
      hora: '14:45',
      productos: [
        { id: '2', sku: 'SUP-002', nombre: 'Cúrcuma Orgánica', precio: 99, cantidad: 1, subtotal: 99 }
      ],
      subtotal: 99,
      iva: 15.84,
      total: 114.84,
      metodoPago: 'tarjeta',
      numeroTicket: 'TKT-001235',
      estado: 'preparando'
    }
  ]);

  avanzarEstado(orden: Orden) {
    const estados: Array<Orden['estado']> = ['pendiente', 'preparando', 'lista', 'entregada'];
    const indexActual = estados.indexOf(orden.estado);
    
    if (indexActual < estados.length - 1) {
      this.ordenes.update(ordenes =>
        ordenes.map(o =>
          o.numeroOrden === orden.numeroOrden
            ? { ...o, estado: estados[indexActual + 1] }
            : o
        )
      );
    }
  }
}
