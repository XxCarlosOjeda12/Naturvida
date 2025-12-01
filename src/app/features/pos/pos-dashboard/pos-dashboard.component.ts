import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PosService } from '../../../core/services/pos.service';

@Component({
  selector: 'app-pos-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="flex h-screen bg-gray-50 overflow-hidden font-sans">

      <aside class="bg-white border-r border-gray-200 flex flex-col shadow-xl z-20 transition-all duration-300 ease-in-out relative"
             [class.w-64]="sidebarOpen()"
             [class.w-20]="!sidebarOpen()">
        
        <button (click)="toggleSidebar()"
                class="absolute -right-3 top-9 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors z-50 focus:outline-none">
            <i class="fas" [class.fa-chevron-left]="sidebarOpen()" [class.fa-chevron-right]="!sidebarOpen()"></i>
        </button>

        <div class="h-20 flex items-center px-6 border-b border-gray-100 overflow-hidden whitespace-nowrap shrink-0">
          <div class="w-8 h-8 min-w-[2rem] bg-primary rounded-lg flex items-center justify-center text-white shadow-md shadow-primary/30 transition-transform duration-300"
               [class.mr-3]="sidebarOpen()"
               [class.mx-auto]="!sidebarOpen()">
            <i class="fas fa-leaf"></i>
          </div>
          <div class="transition-opacity duration-200" [class.opacity-0]="!sidebarOpen()" [class.hidden]="!sidebarOpen()">
             <h1 class="text-xl font-extrabold text-gray-800 tracking-tight">NaturVida</h1>
          </div>
        </div>

        <nav class="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          
          <p class="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 transition-opacity duration-300 h-4"
             [class.opacity-0]="!sidebarOpen()"
             [class.text-center]="!sidebarOpen()">
             {{ sidebarOpen() ? 'Principal' : '•••' }}
          </p>
          
          <a routerLink="/pos/dashboard" 
             routerLinkActive="bg-primary/10 text-primary font-bold shadow-sm" 
             class="flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-primary transition-all group relative overflow-hidden whitespace-nowrap mb-1"
             [title]="!sidebarOpen() ? 'Dashboard' : ''">
            <i class="fas fa-chart-pie w-6 text-center text-lg transition-colors group-hover:text-primary"></i>
            <span class="ml-3 transition-opacity duration-300" [class.opacity-0]="!sidebarOpen()">Dashboard</span>
          </a>

          <a routerLink="/pos/venta" 
             routerLinkActive="bg-primary/10 text-primary font-bold shadow-sm"
             class="flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-primary transition-all group relative overflow-hidden whitespace-nowrap mb-1"
             [title]="!sidebarOpen() ? 'Ir a Vender' : ''">
            <i class="fas fa-cash-register w-6 text-center text-lg transition-colors group-hover:text-primary"></i>
            <span class="ml-3 transition-opacity duration-300" [class.opacity-0]="!sidebarOpen()">Ir a Vender</span>
          </a>

          <a routerLink="/pos/ordenes" 
             routerLinkActive="bg-primary/10 text-primary font-bold shadow-sm"
             class="flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-primary transition-all group relative overflow-hidden whitespace-nowrap mb-1"
             [title]="!sidebarOpen() ? 'Órdenes' : ''">
            <div class="relative w-6 text-center">
                <i class="fas fa-clipboard-list text-lg transition-colors group-hover:text-primary"></i>
            </div>
            <span class="ml-3 transition-opacity duration-300" [class.opacity-0]="!sidebarOpen()">Órdenes</span>
          </a>

          <a routerLink="/pos/pedidos-online" 
             routerLinkActive="bg-primary/10 text-primary font-bold shadow-sm"
             class="flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-primary transition-all group relative overflow-hidden whitespace-nowrap"
             [title]="!sidebarOpen() ? 'Pedidos Online' : ''">
            <div class="relative w-6 text-center">
                <i class="fas fa-globe text-lg transition-colors group-hover:text-primary"></i>
                <span *ngIf="pedidosOnlinePendientes() > 0" class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white"></span>
            </div>
            <span class="ml-3 transition-opacity duration-300" [class.opacity-0]="!sidebarOpen()">Pedidos Online</span>
            
            <span *ngIf="pedidosOnlinePendientes() > 0 && sidebarOpen()" class="ml-auto bg-blue-100 text-blue-600 py-0.5 px-2 rounded-md text-xs font-bold animate-pulse">
                {{ pedidosOnlinePendientes() }}
            </span>
          </a>

          <div class="my-6 border-t border-gray-100 mx-2"></div>
          
          <p class="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 transition-opacity duration-300 h-4"
             [class.opacity-0]="!sidebarOpen()"
             [class.text-center]="!sidebarOpen()">
             {{ sidebarOpen() ? 'Caja' : '•••' }}
          </p>

          <button (click)="mostrarModalCierre = true"
                  class="w-full flex items-center px-3 py-3 text-gray-500 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all font-medium text-left relative overflow-hidden whitespace-nowrap group"
                  [title]="!sidebarOpen() ? 'Cerrar Caja' : ''">
            <i class="fas fa-lock w-6 text-center text-lg transition-colors"></i>
            <span class="ml-3 transition-opacity duration-300" [class.opacity-0]="!sidebarOpen()">Cerrar Caja</span>
          </button>
        </nav>

        <div class="p-4 border-t border-gray-100 bg-gray-50/50 overflow-hidden whitespace-nowrap shrink-0">
          <div class="flex items-center" [class.justify-center]="!sidebarOpen()" [class.justify-start]="sidebarOpen()">
            <div class="w-10 h-10 min-w-[2.5rem] rounded-full bg-white flex items-center justify-center text-gray-500 border border-gray-200 shadow-sm">
              <i class="fas fa-user"></i>
            </div>
            
            <div class="ml-3 min-w-0 transition-opacity duration-300" [class.opacity-0]="!sidebarOpen()" [class.hidden]="!sidebarOpen()">
              <p class="text-sm font-bold text-gray-800 truncate max-w-[120px]">{{ posService.cajaActual().cajero }}</p>
              <p class="text-[10px] text-green-600 flex items-center gap-1 uppercase font-bold tracking-wider">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
              </p>
            </div>
            
            <button *ngIf="sidebarOpen()" (click)="cerrarSesion()" class="ml-auto text-gray-400 hover:text-red-500 transition-colors p-2" title="Salir">
                <i class="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
      </aside>

      <main class="flex-1 flex flex-col overflow-hidden relative bg-gray-50/50 transition-all duration-300">
        <header class="h-20 bg-white border-b border-gray-200 flex justify-between items-center px-8 shadow-sm z-10 sticky top-0">
           <div>
              <h2 class="text-xl font-bold text-gray-800">Dashboard</h2>
              <p class="text-sm text-gray-500">{{ currentDate | date:'fullDate' }}</p>
           </div>
           <div class="hidden md:flex items-center gap-3 bg-gray-50 px-5 py-2.5 rounded-xl border border-gray-100 shadow-inner">
              <i class="far fa-clock text-primary text-lg"></i>
              <span class="font-mono text-gray-700 font-bold text-lg tracking-widest">{{ currentTime() | date:'HH:mm:ss' }}</span>
           </div>
        </header>

        <div class="flex-1 overflow-y-auto p-8">
             <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                <div class="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 group hover:-translate-y-1 transition-transform duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-3 bg-green-50 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <i class="fas fa-dollar-sign text-xl"></i>
                        </div>
                        <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                            <i class="fas fa-arrow-up"></i> {{ posService.numeroVentasHoy() }} tickets
                        </span>
                    </div>
                    <p class="text-gray-500 text-xs font-bold uppercase tracking-wider">Ventas Totales</p>
                    <h3 class="text-2xl font-extrabold text-gray-800 mt-1">\${{ posService.totalVentasHoy().toFixed(2) }}</h3>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 group hover:-translate-y-1 transition-transform duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-3 bg-blue-50 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <i class="fas fa-chart-line text-xl"></i>
                        </div>
                    </div>
                    <p class="text-gray-500 text-xs font-bold uppercase tracking-wider">Ticket Promedio</p>
                    <h3 class="text-2xl font-extrabold text-gray-800 mt-1">\${{ posService.ticketPromedio().toFixed(2) }}</h3>
                </div>
                <div class="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 group hover:-translate-y-1 transition-transform duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-3 bg-orange-50 rounded-xl text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <i class="fas fa-stopwatch text-xl"></i>
                        </div>
                        <span *ngIf="pedidosOnlinePendientes() > 0" class="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                    </div>
                    <p class="text-gray-500 text-xs font-bold uppercase tracking-wider">Pedidos Online</p>
                    <h3 class="text-2xl font-extrabold text-gray-800 mt-1">{{ pedidosOnlinePendientes() }}</h3>
                </div>
                 <div class="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 group hover:-translate-y-1 transition-transform duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <div class="p-3 bg-gray-100 rounded-xl text-gray-600 group-hover:bg-gray-800 group-hover:text-white transition-colors">
                            <i class="fas fa-wallet text-xl"></i>
                        </div>
                    </div>
                    <p class="text-gray-500 text-xs font-bold uppercase tracking-wider">Total en Caja</p>
                    <h3 class="text-2xl font-extrabold text-gray-800 mt-1">\${{ posService.cajaActual().montoActual.toFixed(2) }}</h3>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                        <div>
                            <h3 class="font-bold text-gray-800">Transacciones Recientes</h3>
                            <p class="text-xs text-gray-500">Últimos movimientos del turno</p>
                        </div>
                        <a routerLink="/pos/reportes" class="px-3 py-1.5 text-xs font-bold text-primary bg-primary/5 rounded-lg hover:bg-primary hover:text-white transition-colors">
                            Ver reporte completo
                        </a>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Hora</th>
                                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                                    <th class="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Método</th>
                                    <th class="px-6 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-50">
                                <tr *ngFor="let venta of ultimasVentas()" class="hover:bg-gray-50/80 transition-colors group">
                                    <td class="px-6 py-4 text-sm text-gray-500 font-mono">{{ venta.fecha | date:'HH:mm' }}</td>
                                    <td class="px-6 py-4 text-sm font-medium text-gray-700">{{ venta.cliente }}</td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center gap-2">
                                            <i class="fas text-xs" 
                                               [ngClass]="{
                                                'fa-money-bill text-green-500': venta.metodoPago === 'efectivo',
                                                'fa-credit-card text-blue-500': venta.metodoPago === 'tarjeta',
                                                'fa-mobile-alt text-purple-500': venta.metodoPago === 'transferencia'
                                               }"></i>
                                            <span class="text-sm text-gray-600 capitalize">{{ venta.metodoPago }}</span>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-right font-bold text-gray-800 group-hover:text-primary transition-colors">\${{ venta.total.toFixed(2) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-gray-800 mb-6">Métodos de Pago</h3>
                        <div class="space-y-6">
                            <div *ngFor="let metodo of ['efectivo', 'tarjeta', 'transferencia']" class="group">
                                <div class="flex justify-between text-sm mb-2">
                                    <span class="text-gray-600 flex items-center gap-2 capitalize">
                                        <div class="w-6 h-6 rounded-md flex items-center justify-center text-xs"
                                             [ngClass]="{
                                                'bg-green-100 text-green-600': metodo === 'efectivo',
                                                'bg-blue-100 text-blue-600': metodo === 'tarjeta',
                                                'bg-purple-100 text-purple-600': metodo === 'transferencia'
                                             }">
                                             <i class="fas" [ngClass]="{
                                                'fa-money-bill': metodo === 'efectivo',
                                                'fa-credit-card': metodo === 'tarjeta',
                                                'fa-mobile-alt': metodo === 'transferencia'
                                             }"></i>
                                        </div>
                                        {{ metodo }}
                                    </span>
                                    <span class="font-bold text-gray-800">\${{ getMontoMetodo(metodo).toFixed(2) }}</span>
                                </div>
                                <div class="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div class="h-full rounded-full transition-all duration-1000 ease-out" 
                                         [style.width.%]="calcularPorcentaje(getMontoMetodo(metodo))"
                                         [ngClass]="{
                                            'bg-green-500': metodo === 'efectivo',
                                            'bg-blue-500': metodo === 'tarjeta',
                                            'bg-purple-500': metodo === 'transferencia'
                                         }"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                     <div class="mt-8 pt-6 border-t border-gray-100 bg-gray-50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                        <div class="flex justify-between items-center">
                            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Recaudación Total</span>
                            <i class="fas fa-coins text-yellow-400 text-xl"></i>
                        </div>
                        <p class="text-3xl font-extrabold text-gray-800 mt-2">\${{ posService.totalVentasHoy().toFixed(2) }}</p>
                    </div>
                </div>
            </div>
        </div>
      </main>

       <div *ngIf="mostrarModalCierre" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" (click)="mostrarModalCierre = false"></div>
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden animate-fade-in-up">
              <div class="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white text-center">
                  <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                      <i class="fas fa-lock text-3xl"></i>
                  </div>
                  <h2 class="text-xl font-bold">¿Cerrar Turno?</h2>
              </div>
              <div class="p-6">
                   <p class="text-gray-600 text-center text-sm mb-6">Se generará el reporte final y se cerrará la sesión actual.</p>
                   <div class="bg-gray-50 p-4 rounded-xl mb-6 space-y-3 border border-gray-100">
                       <div class="flex justify-between text-sm">
                           <span class="text-gray-500">Ventas Hoy:</span>
                           <span class="font-bold text-gray-800">\${{ posService.totalVentasHoy().toFixed(2) }}</span>
                       </div>
                       <div class="flex justify-between text-sm pt-2 border-t border-gray-200">
                           <span class="text-gray-500">Total en Caja:</span>
                           <span class="font-bold text-green-600">\${{ posService.cajaActual().montoActual.toFixed(2) }}</span>
                       </div>
                   </div>
                   <div class="flex gap-3">
                       <button (click)="mostrarModalCierre = false" class="flex-1 py-3 text-gray-600 font-bold bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors">Cancelar</button>
                       <button (click)="confirmarCierre()" class="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-lg shadow-red-500/30 transition-colors">Cerrar Caja</button>
                   </div>
              </div>
          </div>
      </div>

    </div>
  `,
  styles: [`
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
        animation: fadeInUp 0.3s ease-out forwards;
    }
  `]
})
export class PosDashboardComponent implements OnInit, OnDestroy {
  posService = inject(PosService);
  private router = inject(Router);

  sidebarOpen = signal(true);
  mostrarModalCierre = false;
  currentTime = signal(new Date());
  currentDate = new Date();
  timer: any;
  pedidosOnlinePendientes = signal(5);  

  ultimasVentas = computed(() => {
    return this.posService.ventasHoy().slice().reverse().slice(0, 5);
  });

  ventasPorMetodo = computed(() => {
    const ventas = this.posService.ventasHoy();
    return {
      efectivo: ventas.filter(v => v.metodoPago === 'efectivo').reduce((sum, v) => sum + v.total, 0),
      tarjeta: ventas.filter(v => v.metodoPago === 'tarjeta').reduce((sum, v) => sum + v.total, 0),
      transferencia: ventas.filter(v => v.metodoPago === 'transferencia').reduce((sum, v) => sum + v.total, 0),
    };
  });

  ngOnInit() {
    this.timer = setInterval(() => {
      this.currentTime.set(new Date());
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

  getMontoMetodo(metodo: string): number {
    const map: any = this.ventasPorMetodo();
    return map[metodo] || 0;
  }

  calcularPorcentaje(monto: number): number {
    const total = this.posService.totalVentasHoy();
    if (total === 0) return 0;
    return (monto / total) * 100;
  }

  cerrarSesion() {
    if (confirm('¿Deseas cerrar sesión sin cerrar caja?')) {
      localStorage.removeItem('naturvida_pos_empleado');
      this.router.navigate(['/pos-login']);
    }
  }

  confirmarCierre() {
    this.posService.cerrarCaja();
    localStorage.removeItem('naturvida_pos_empleado');
    this.router.navigate(['/pos-login']);
  }
}