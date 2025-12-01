import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { AdminProductModalComponent } from '../inventory/admin-product-modal.component';
import { AdminConfirmModalComponent } from '../shared/admin-confirm-modal.component';
import { AdminSettingsModalComponent } from '../dashboard/admin-settings-modal.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AdminProductModalComponent, AdminConfirmModalComponent, AdminSettingsModalComponent],
  template: `
    <header class="h-20 bg-white border-b border-gray-200 flex justify-between items-center px-8 shadow-sm z-10 sticky top-0">
        <div>
            <h2 class="text-xl font-bold text-gray-800">Panel de Control</h2>
            <p class="text-sm text-gray-500">{{ currentDate | date:'fullDate' }}</p>
        </div>
        <div class="hidden md:flex items-center gap-3 bg-gray-50 px-5 py-2.5 rounded-xl border border-gray-100 shadow-inner">
            <i class="far fa-clock text-dark text-lg"></i>
            <span class="font-mono text-gray-700 font-bold text-lg tracking-widest">{{ currentTime() | date:'HH:mm:ss' }}</span>
        </div>
    </header>

    <div class="flex-1 overflow-y-auto p-8 bg-gray-50/50">
        
        <!-- KPIs -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div class="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 group hover:-translate-y-1 transition-transform duration-300">
                <div class="flex justify-between items-start mb-4">
                    <div class="p-3 bg-green-50 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <i class="fas fa-chart-line text-xl"></i>
                    </div>
                    <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                        <i class="fas fa-arrow-up"></i> 15%
                    </span>
                </div>
                <p class="text-gray-500 text-xs font-bold uppercase tracking-wider">Ingresos Mensuales</p>
                <h3 class="text-2xl font-extrabold text-gray-800 mt-1">$45,250.00</h3>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 group hover:-translate-y-1 transition-transform duration-300">
                <div class="flex justify-between items-start mb-4">
                    <div class="p-3 bg-blue-50 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <i class="fas fa-shopping-bag text-xl"></i>
                    </div>
                </div>
                <p class="text-gray-500 text-xs font-bold uppercase tracking-wider">Órdenes Totales</p>
                <h3 class="text-2xl font-extrabold text-gray-800 mt-1">1,245</h3>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 group hover:-translate-y-1 transition-transform duration-300">
                <div class="flex justify-between items-start mb-4">
                    <div class="p-3 bg-orange-50 rounded-xl text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        <i class="fas fa-box-open text-xl"></i>
                    </div>
                    <span *ngIf="lowStockCount() > 0" class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                </div>
                <p class="text-gray-500 text-xs font-bold uppercase tracking-wider">Alerta Inventario</p>
                <h3 class="text-2xl font-extrabold text-gray-800 mt-1">{{ lowStockCount() }} Items</h3>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 group hover:-translate-y-1 transition-transform duration-300">
                <div class="flex justify-between items-start mb-4">
                    <div class="p-3 bg-purple-50 rounded-xl text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                        <i class="fas fa-users text-xl"></i>
                    </div>
                </div>
                <p class="text-gray-500 text-xs font-bold uppercase tracking-wider">Clientes Activos</p>
                <h3 class="text-2xl font-extrabold text-gray-800 mt-1">892</h3>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
             
            <!-- Tabla Recientes -->
            <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                    <div>
                        <h3 class="font-bold text-gray-800">Actividad Reciente</h3>
                        <p class="text-xs text-gray-500">Últimas transacciones globales</p>
                    </div>
                    <button class="px-3 py-1.5 text-xs font-bold text-dark bg-gray-200 rounded-lg hover:bg-dark hover:text-white transition-colors">
                        Ver Todo
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Orden</th>
                                <th class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Canal</th>
                                <th class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Estado</th>
                                <th class="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50">
                            <tr class="hover:bg-gray-50/80 transition-colors group">
                                <td class="px-6 py-4 text-sm font-medium text-gray-700">#WEB-992</td>
                                <td class="px-6 py-4"><span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Online</span></td>
                                <td class="px-6 py-4"><span class="text-yellow-600 text-xs font-bold">Pendiente</span></td>
                                <td class="px-6 py-4 text-sm text-right font-bold text-gray-800">$1,250.00</td>
                            </tr>
                            <tr class="hover:bg-gray-50/80 transition-colors group">
                                <td class="px-6 py-4 text-sm font-medium text-gray-700">#POS-440</td>
                                <td class="px-6 py-4"><span class="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">POS</span></td>
                                <td class="px-6 py-4"><span class="text-green-600 text-xs font-bold">Completado</span></td>
                                <td class="px-6 py-4 text-sm text-right font-bold text-gray-800">$320.50</td>
                            </tr>
                             <tr class="hover:bg-gray-50/80 transition-colors group">
                                <td class="px-6 py-4 text-sm font-medium text-gray-700">#WEB-991</td>
                                <td class="px-6 py-4"><span class="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Online</span></td>
                                <td class="px-6 py-4"><span class="text-green-600 text-xs font-bold">Enviado</span></td>
                                <td class="px-6 py-4 text-sm text-right font-bold text-gray-800">$850.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Accesos Rápidos con Click Events -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 class="font-bold text-gray-800 mb-6">Accesos Rápidos</h3>
                <div class="space-y-4">
                    
                    <!-- Botón: Nuevo Producto -->
                    <button (click)="openProductModal()"
                            class="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary hover:text-primary transition-all group">
                        <span class="font-bold text-gray-600 group-hover:text-primary">Nuevo Producto</span>
                        <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                            <i class="fas fa-plus"></i>
                        </div>
                    </button>

                    <!-- Botón: Exportar Ventas -->
                    <button (click)="openExportModal()"
                            class="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary hover:text-primary transition-all group">
                        <span class="font-bold text-gray-600 group-hover:text-primary">Exportar Ventas</span>
                        <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                            <i class="fas fa-file-excel"></i>
                        </div>
                    </button>
                    
                    <!-- Botón: Configuración -->
                    <button (click)="openSettingsModal()"
                            class="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary hover:text-primary transition-all group">
                        <span class="font-bold text-gray-600 group-hover:text-primary">Configuración</span>
                        <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">
                            <i class="fas fa-cog"></i>
                        </div>
                    </button>
                </div>
            </div>

        </div>
    </div>

    <!-- MODAL: Nuevo Producto -->
    @if (showProductModal()) {
        <app-admin-product-modal 
            (close)="showProductModal.set(false)"
            (saveProduct)="handleProductSave($event)">
        </app-admin-product-modal>
    }

    <!-- MODAL: Exportar Ventas (Confirmación) -->
    @if (showExportModal()) {
        <app-admin-confirm-modal
            title="¿Exportar Reporte de Ventas?"
            message="Se generará un archivo Excel con todas las transacciones del mes en curso."
            actionText="Descargar Excel"
            type="warning"
            (cancel)="showExportModal.set(false)"
            (confirm)="handleExport()">
        </app-admin-confirm-modal>
    }

    <!-- MODAL: Configuración -->
    @if (showSettingsModal()) {
        <app-admin-settings-modal
            (close)="showSettingsModal.set(false)"
            (save)="handleSettingsSave($event)">
        </app-admin-settings-modal>
    }
  `
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  
  currentTime = signal(new Date());
  currentDate = new Date();
  timer: any;

  // Mock 
  lowStockCount = computed(() => 3);

  showProductModal = signal(false);
  showExportModal = signal(false);
  showSettingsModal = signal(false);

  ngOnInit() {
    this.timer = setInterval(() => {
      this.currentTime.set(new Date());
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  openProductModal() { this.showProductModal.set(true); }
  openExportModal() { this.showExportModal.set(true); }
  openSettingsModal() { this.showSettingsModal.set(true); }

  handleProductSave(product: any) {
    console.log('Nuevo producto creado desde Dashboard:', product);
    // Aca te avientas el back
  }

  handleExport() {
    console.log('Descargando reporte...');
    this.showExportModal.set(false);
     // Aca te avientas el back
  }

  handleSettingsSave(settings: any) {
    console.log('Guardando configuración:', settings);
    this.showSettingsModal.set(false);
     // Aca te avientas el back
  }
}