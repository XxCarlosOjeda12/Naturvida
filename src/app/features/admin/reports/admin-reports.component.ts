import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full overflow-y-auto p-8 bg-gray-50/50">
      
      <!-- Header -->
      <div class="mb-8 flex justify-between items-end">
        <div>
            <h1 class="text-2xl font-bold text-gray-800 tracking-tight">Reportes de Rendimiento</h1>
            <p class="text-sm text-gray-500 mt-1">Análisis detallado de ventas y crecimiento</p>
        </div>
        <button class="text-sm font-bold text-primary hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-primary/20">
            <i class="fas fa-download mr-2"></i> Exportar PDF
        </button>
      </div>

      <!--  KPI CARDS: El primero ahora es Primary Gradient -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <!-- CARD PRINCIPAL: INGRESOS (Corregido) -->
        <div class="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl text-white shadow-lg shadow-primary/30 relative overflow-hidden group">
            <!-- Decoración de fondo -->
            <div class="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
            
            <div class="relative z-10">
                <p class="text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Ingresos Netos</p>
                <h3 class="text-4xl font-extrabold tracking-tight">$45,250.00</h3>
                <div class="mt-4 flex items-center gap-2">
                    <span class="bg-white/20 px-2 py-1 rounded-lg text-xs font-bold flex items-center backdrop-blur-sm">
                        <i class="fas fa-arrow-up mr-1"></i> 12%
                    </span>
                    <span class="text-white/80 text-xs">vs mes anterior</span>
                </div>
            </div>
        </div>
        
        <!-- Ticket Promedio -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-primary/30 transition-colors group">
            <div class="flex justify-between items-start">
                <p class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Ticket Promedio</p>
                <div class="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                    <i class="fas fa-receipt"></i>
                </div>
            </div>
            <h3 class="text-3xl font-bold text-gray-800 mt-2">$340.00</h3>
             <div class="mt-2 flex items-center text-red-500 text-xs font-bold">
                <i class="fas fa-arrow-down mr-1"></i> 2% <span class="text-gray-400 font-normal ml-1">vs objetivo</span>
            </div>
        </div>

        <!-- Productos Vendidos -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-primary/30 transition-colors group">
            <div class="flex justify-between items-start">
                <p class="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Volumen Ventas</p>
                <div class="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                    <i class="fas fa-box-open"></i>
                </div>
            </div>
            <h3 class="text-3xl font-bold text-gray-800 mt-2">1,204 <span class="text-lg text-gray-400 font-medium">unid.</span></h3>
            <div class="mt-2 flex items-center text-green-600 text-xs font-bold">
                <i class="fas fa-arrow-up mr-1"></i> 5% <span class="text-gray-400 font-normal ml-1">vs mes anterior</span>
            </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[28rem]"> <!-- Altura fija para el grid -->
        
        <!--  GRÁFICA DE BARRAS MEJORADA (2 Columnas) -->
        <div class="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div class="flex justify-between items-center mb-8">
                <h3 class="font-bold text-gray-800 text-lg">Resumen de Ventas</h3>
                <select class="text-xs border-none bg-gray-100 rounded-lg px-3 py-1.5 text-gray-600 font-bold focus:ring-0 cursor-pointer hover:bg-gray-200 transition-colors">
                    <option>Últimos 6 meses</option>
                    <option>Este Año</option>
                </select>
            </div>
            
            <!-- Chart Container -->
            <div class="flex-1 relative w-full flex items-end justify-between gap-2 px-2 pb-2">
                
                <!-- Grid de fondo (Líneas horizontales) -->
                <div class="absolute inset-0 flex flex-col justify-between pointer-events-none z-0 pb-6 pr-4">
                    <div class="border-b border-dashed border-gray-200 w-full h-0"></div>
                    <div class="border-b border-dashed border-gray-200 w-full h-0"></div>
                    <div class="border-b border-dashed border-gray-200 w-full h-0"></div>
                    <div class="border-b border-dashed border-gray-200 w-full h-0"></div>
                    <div class="border-b border-gray-300 w-full h-0"></div> <!-- Línea base -->
                </div>

                <!-- Barras -->
                @for (item of salesData; track item.month) {
                    <div class="flex flex-col items-center gap-3 flex-1 h-full justify-end group z-10 relative cursor-pointer">
                        
                        <!-- Tooltip Flotante -->
                        <div class="opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 absolute -top-12 bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-20 pointer-events-none">
                            \${{ item.value | number }}
                            <!-- Flechita del tooltip -->
                            <div class="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-gray-800 rotate-45"></div>
                        </div>

                        <!-- Barra Visual -->
                        <div class="w-full max-w-[50px] bg-gray-100 rounded-t-xl relative overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20"
                             [style.height.%]="(item.value / maxValue) * 100">
                             
                             <!-- Relleno con Gradiente -->
                             <div class="absolute inset-0 bg-gradient-to-t from-primary to-primary-dark opacity-80 group-hover:opacity-100 transition-opacity animate-grow-up"></div>
                             
                             <!-- Brillo superior -->
                             <div class="absolute top-0 left-0 right-0 h-1 bg-white/30"></div>
                        </div>

                        <!-- Etiqueta Mes -->
                        <span class="text-xs font-bold text-gray-400 group-hover:text-primary transition-colors">{{ item.month }}</span>
                    </div>
                }
            </div>
        </div>

        <!--  TOP PRODUCTOS (1 Columna) -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <h3 class="font-bold text-gray-800 mb-6 text-lg">Top Productos</h3>
            
            <div class="space-y-6 flex-1 overflow-y-auto pr-2 custom-scroll">
                @for (prod of topProducts; track prod.name) {
                    <div class="group">
                        <div class="flex items-center gap-4 mb-3">
                            <!-- Icono con fondo dinámico -->
                            <div class="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                <i class="fas fa-leaf"></i>
                            </div>
                            <div class="flex-1">
                                <div class="flex justify-between items-center mb-1">
                                    <span class="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">{{ prod.name }}</span>
                                    <span class="text-sm font-bold text-gray-800">\${{ prod.sales }}</span>
                                </div>
                                <span class="text-xs text-gray-400">{{ prod.percent }}% de ventas totales</span>
                            </div>
                        </div>
                        
                        <!-- Barra de progreso -->
                        <div class="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div class="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" 
                                 [style.width.%]="prod.percent"></div>
                        </div>
                    </div>
                }
            </div>
            
            <button class="w-full mt-6 py-3 text-sm font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200">
                Ver todos los productos
            </button>
        </div>

      </div>

    </div>
  `,
  styles: [`
    @keyframes growUp { from { height: 0; } to { height: 100%; } }
    .animate-grow-up { animation: growUp 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    
    /* Scrollbar sutil para la lista de productos */
    .custom-scroll::-webkit-scrollbar { width: 4px; }
    .custom-scroll::-webkit-scrollbar-track { background: transparent; }
    .custom-scroll::-webkit-scrollbar-thumb { background-color: #e5e7eb; border-radius: 20px; }
  `]
})
export class AdminReportsComponent {
  maxValue = 50000;

  salesData = [
    { month: 'JUL', value: 15000 },
    { month: 'AGO', value: 28000 },
    { month: 'SEP', value: 18000 },
    { month: 'OCT', value: 38000 },
    { month: 'NOV', value: 24000 },
    { month: 'DIC', value: 45250 },
  ];

  topProducts = [
    { name: 'Aceite de Lavanda', sales: '12,400', percent: 85 },
    { name: 'Proteína Vegana', sales: '8,200', percent: 65 },
    { name: 'Té Matcha Premium', sales: '5,100', percent: 45 },
    { name: 'Jabón de Avena', sales: '3,200', percent: 30 },
  ];
}