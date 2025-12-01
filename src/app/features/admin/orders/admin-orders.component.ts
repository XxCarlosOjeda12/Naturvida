import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrderDetailComponent } from './admin-order-detail.component';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, AdminOrderDetailComponent],  
  template: `
    <div class="h-full flex flex-col p-8 bg-gray-50/50">
      
      <!-- Header de la sección -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h1 class="text-2xl font-bold text-gray-800">Gestión de Órdenes</h1>
            <p class="text-sm text-gray-500">Historial completo de transacciones (POS + E-commerce)</p>
        </div>
        
        <!-- Filtros Rápidos (Tabs) -->
        <div class="bg-white p-1 rounded-xl border border-gray-200 shadow-sm flex">
            <button (click)="filter.set('all')" 
                    class="px-4 py-1.5 rounded-lg text-sm font-bold transition-all"
                    [ngClass]="filter() === 'all' ? 'bg-gray-100 text-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'">
                Todas
            </button>
            <button (click)="filter.set('online')" 
                    class="px-4 py-1.5 rounded-lg text-sm font-bold transition-all"
                    [ngClass]="filter() === 'online' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'">
                Online
            </button>
            <button (click)="filter.set('pos')" 
                    class="px-4 py-1.5 rounded-lg text-sm font-bold transition-all"
                    [ngClass]="filter() === 'pos' ? 'bg-purple-50 text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'">
                POS
            </button>
        </div>
      </div>

      <!-- Tabla de Órdenes -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex-1 flex flex-col">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Orden ID</th>
                        <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Fecha</th>
                        <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                        <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Canal</th>
                        <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Estado</th>
                        <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Total</th>
                        <th class="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                    @for (order of filteredOrders(); track order.id) {
                    <tr class="hover:bg-gray-50/80 transition-colors group">
                        <!-- ID -->
                        <td class="px-6 py-4 text-sm font-mono font-bold text-gray-700">
                            {{ order.id }}
                        </td>
                        
                        <!-- Fecha -->
                        <td class="px-6 py-4 text-sm text-gray-500">
                            {{ order.date | date:'mediumDate' }} <br>
                            <span class="text-xs text-gray-400">{{ order.date | date:'shortTime' }}</span>
                        </td>

                        <!-- Cliente -->
                        <td class="px-6 py-4">
                            <p class="text-sm font-bold text-gray-800">{{ order.customer }}</p>
                            <p class="text-xs text-gray-500">{{ order.email || 'Sin email' }}</p>
                        </td>

                        <!-- Canal (Badge) -->
                        <td class="px-6 py-4 text-center">
                            <span class="px-2.5 py-1 rounded-lg text-xs font-bold border"
                                  [ngClass]="{
                                    'bg-blue-50 text-blue-600 border-blue-100': order.channel === 'Online',
                                    'bg-purple-50 text-purple-600 border-purple-100': order.channel === 'POS'
                                  }">
                                {{ order.channel }}
                            </span>
                        </td>

                        <!-- Estado -->
                        <td class="px-6 py-4 text-center">
                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                                  [ngClass]="{
                                    'bg-green-100 text-green-700': order.status === 'Completado',
                                    'bg-yellow-100 text-yellow-700': order.status === 'Pendiente',
                                    'bg-gray-100 text-gray-600': order.status === 'Procesando'
                                  }">
                                <span class="w-1.5 h-1.5 rounded-full" 
                                      [ngClass]="{
                                        'bg-green-600': order.status === 'Completado',
                                        'bg-yellow-600': order.status === 'Pendiente',
                                        'bg-gray-500': order.status === 'Procesando'
                                      }"></span>
                                {{ order.status }}
                            </span>
                        </td>

                        <!-- Total -->
                        <td class="px-6 py-4 text-right">
                            <span class="text-sm font-bold text-gray-800">\${{ order.total }}</span>
                        </td>

                        <!-- Acciones (Botón Ver) -->
                        <td class="px-6 py-4 text-center">
                            <button (click)="viewOrder(order)" 
                                    class="text-gray-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/5 group-hover:bg-white border border-transparent hover:border-gray-200 shadow-sm"
                                    title="Ver Detalles">
                                <i class="fas fa-eye"></i>
                            </button>
                        </td>
                    </tr>
                    }
                </tbody>
            </table>
        </div>
        
        <!-- Paginación Simple -->
        <div class="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 mt-auto">
            <span class="text-xs text-gray-500">Mostrando {{ filteredOrders().length }} de {{ orders().length }} resultados</span>
            <div class="flex gap-2">
                <button class="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-500 disabled:opacity-50" disabled>Anterior</button>
                <button class="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-500 hover:text-dark hover:border-gray-300">Siguiente</button>
            </div>
        </div>
      </div>

      <!-- MODAL DETALLE -->
      @if (selectedOrder()) {
        <app-admin-order-detail 
            [orden]="selectedOrder()" 
            (close)="selectedOrder.set(null)">
        </app-admin-order-detail>
      }

    </div>
  `
})
export class AdminOrdersComponent {
  filter = signal<'all' | 'online' | 'pos'>('all');
  selectedOrder = signal<any>(null); 

  // Mock  
  orders = signal([
    { id: '#ORD-7721', date: new Date(), customer: 'María González', email: 'maria@gmail.com', channel: 'Online', status: 'Pendiente', total: 1250.00 },
    { id: '#POS-0092', date: new Date(), customer: 'Cliente Mostrador', email: null, channel: 'POS', status: 'Completado', total: 320.50 },
    { id: '#ORD-7720', date: new Date('2024-11-20'), customer: 'Pedro Pascal', email: 'pedro@hollywood.com', channel: 'Online', status: 'Completado', total: 4500.00 },
    { id: '#POS-0091', date: new Date('2024-11-19'), customer: 'Ana de Armas', email: null, channel: 'POS', status: 'Completado', total: 120.00 },
    { id: '#ORD-7719', date: new Date('2024-11-18'), customer: 'Luisa Lane', email: 'luisa@daily.com', channel: 'Online', status: 'Procesando', total: 890.00 },
  ]);

  filteredOrders = computed(() => {
    const f = this.filter();
    if (f === 'all') return this.orders();
    return this.orders().filter(o => o.channel.toLowerCase() === f);
  });

  viewOrder(order: any) {
    this.selectedOrder.set(order);
  }
}