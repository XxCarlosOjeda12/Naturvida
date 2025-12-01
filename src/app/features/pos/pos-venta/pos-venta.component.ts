import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router'; 
import { PosService } from '../../../core/services/pos.service';
import { ProductoVenta, Venta } from '../../../core/models/pos.models';
import productosData from '../../../../assets/data/productos.json';

@Component({
  selector: 'app-pos-venta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  template: `
    <div class="h-screen flex bg-gray-100 print:hidden overflow-hidden">
      
      <div class="w-1/2 bg-white border-r border-gray-200 flex flex-col h-full">
        <div class="p-4 border-b border-gray-200 bg-white shadow-sm z-10 flex gap-4 items-center">
          <a routerLink="/pos/dashboard" 
             class="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors shadow-sm"
             title="Volver al Dashboard">
            <i class="fas fa-arrow-left text-lg"></i>
          </a>
          <div class="relative flex-1">
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input type="text" [(ngModel)]="searchTerm" (keyup)="filtrar()" 
                   placeholder="Buscar producto..." 
                   class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary focus:outline-none bg-gray-50 transition-all">
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
            <button *ngFor="let p of productosFiltrados()" (click)="agregar(p)"
                    class="group relative bg-white border border-gray-200 rounded-2xl p-3 hover:shadow-lg hover:border-primary/50 transition-all duration-300 text-left flex flex-col h-full overflow-hidden">
              <div class="aspect-square bg-gray-100 rounded-xl mb-3 overflow-hidden relative">
                  <img [src]="p.imagen" 
                       class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                       alt="{{p.nombre}}">
                  <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span class="bg-white text-primary rounded-full w-10 h-10 flex items-center justify-center shadow-md transform scale-0 group-hover:scale-100 transition-transform delay-75">
                      <i class="fas fa-plus"></i>
                    </span>
                  </div>
              </div>
              <div class="mt-auto">
                <p class="font-bold text-gray-800 text-sm leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors">{{p.nombre}}</p>
                <div class="flex justify-between items-end">
                  <p class="text-xs text-gray-500">Stock: {{p.stock || 20}}</p>
                  <p class="text-lg font-extrabold text-primary">\${{p.precio}}</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="w-1/2 flex flex-col h-full bg-white shadow-2xl z-20">
        <div class="bg-primary p-5 text-white flex justify-between items-center shadow-md">
          <div class="flex items-center gap-3">
            <div class="bg-white/20 p-2 rounded-lg"><i class="fas fa-shopping-basket text-xl"></i></div>
            <div>
              <h2 class="font-bold text-xl leading-none">Venta Actual</h2>
              <p class="text-primary-100 text-xs mt-1">{{ fechaTicket | date:'fullDate' }}</p>
            </div>
          </div>
          <button (click)="limpiar()" class="text-white/80 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2">
            <i class="fas fa-trash"></i> <span class="hidden sm:inline">Vaciar</span>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            <div *ngIf="carrito().length === 0" class="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
              <i class="fas fa-cash-register text-6xl mb-4"></i>
              <p class="font-medium">El carrito está vacío</p>
            </div>

            <div *ngFor="let item of carrito(); let i = index" 
                 class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-primary/30 transition-colors">
                <div class="flex items-center gap-3">
                   <img [src]="item.imagen" class="w-12 h-12 rounded-lg object-cover bg-gray-100">
                   <div>
                      <p class="font-bold text-gray-800 text-sm line-clamp-1">{{item.nombre}}</p>
                      <p class="text-xs text-gray-500 font-mono">\${{item.precio}} x {{item.cantidad}}</p>
                   </div>
                </div>
                <div class="flex items-center gap-4">
                    <p class="font-bold text-gray-900">\${{item.subtotal.toFixed(2)}}</p>
                    <div class="flex items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <button (click)="modificarCantidad(i, -1)" class="w-8 h-8 flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors active:bg-gray-300">-</button>
                        <span class="w-8 text-center text-sm font-bold">{{item.cantidad}}</span>
                        <button (click)="modificarCantidad(i, 1)" class="w-8 h-8 flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors active:bg-gray-300">+</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-30">
            <div class="space-y-1 mb-5 text-sm">
                <div class="flex justify-between text-gray-600"><span>Subtotal:</span> <span class="font-mono">\${{subtotal().toFixed(2)}}</span></div>
                <div class="flex justify-between text-gray-600"><span>IVA (16%):</span> <span class="font-mono">\${{iva().toFixed(2)}}</span></div>
                <div class="flex justify-between text-3xl font-extrabold text-gray-900 pt-2 mt-2 border-t border-dashed border-gray-200">
                    <span>Total:</span> <span class="text-primary">\${{total().toFixed(2)}}</span>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-3 mb-5">
                <button *ngFor="let m of metodosPago" (click)="metodoPago = m; montoRecibido.set(0)"
                        [class.bg-gray-800]="metodoPago === m" [class.text-white]="metodoPago === m"
                        [class.bg-gray-100]="metodoPago !== m" [class.text-gray-600]="metodoPago !== m"
                        class="p-3 rounded-xl border border-gray-200 capitalize text-sm font-bold transition-all hover:bg-gray-200 active:scale-95 flex flex-col items-center gap-1">
                    <i class="fas" [class.fa-money-bill-wave]="m === 'efectivo'" [class.fa-credit-card]="m === 'tarjeta'" [class.fa-exchange-alt]="m === 'transferencia'"></i> {{m}}
                </button>
            </div>

            <div *ngIf="metodoPago === 'efectivo' && total() > 0" class="mb-5 animate-fade-in-down">
                <div class="flex gap-4">
                  <div class="w-1/2">
                    <label class="block text-xs font-bold text-gray-500 mb-1 uppercase">Recibido</label>
                    <div class="relative">
                      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                      <input type="number" [ngModel]="montoRecibido()" (ngModelChange)="montoRecibido.set($event)"
                             class="w-full pl-7 pr-3 py-2 border-2 border-gray-200 rounded-lg font-mono text-lg font-bold focus:border-primary focus:ring-0 outline-none text-right" placeholder="0.00">
                    </div>
                  </div>
                  <div class="w-1/2">
                    <label class="block text-xs font-bold text-gray-500 mb-1 uppercase">Cambio</label>
                    <div class="w-full py-2 px-3 bg-gray-100 rounded-lg font-mono text-lg font-bold text-right" [class.text-green-600]="cambio() >= 0" [class.text-red-500]="cambio() < 0">
                        \${{cambio().toFixed(2)}}
                    </div>
                  </div>
                </div>
            </div>

            <button (click)="procesarVenta()" [disabled]="carrito().length === 0 || (metodoPago === 'efectivo' && cambio() < 0)"
                    class="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2">
                <span>COBRAR</span> <span *ngIf="total() > 0">\${{total().toFixed(2)}}</span> <i class="fas fa-check-circle"></i>
            </button>
        </div>
      </div>
    </div>

    <div class="hidden print:block w-[80mm] p-4 bg-white text-black font-mono leading-tight">
        
        <div class="flex flex-col items-center mb-6 text-center">
            <div class="mb-2 p-2 border-2 border-black rounded-full">
                <i class="fas fa-leaf text-2xl"></i>
            </div>
            <h1 class="text-xl font-extrabold tracking-widest uppercase">NaturVida</h1>
            <p class="text-xs tracking-wider">ECO STORE POS</p>
            <div class="w-full border-b-2 border-black border-dashed my-2"></div>
            
            <div class="text-[10px] space-y-0.5">
                <p>Av. Principal 123, Ciudad</p>
                <p>RFC: NAT20240101-ABC</p>
                <p>Tel: (55) 1234-5678</p>
                <p>www.naturvida.com</p>
            </div>
        </div>

        <div class="text-[10px] mb-4 space-y-1">
            <div class="flex justify-between">
                <span>FECHA: {{fechaTicket | date:'dd/MM/yyyy'}}</span>
                <span>HORA: {{fechaTicket | date:'HH:mm'}}</span>
            </div>
            <div class="flex justify-between">
                <span>TICKET: #{{ticketId.slice(-6)}}</span>
                <span>CAJA: 01</span>
            </div>
            <div class="flex justify-between">
                <span>CAJERO: Juan P.</span>
                <span>CLIENTE: Mostrador</span>
            </div>
        </div>

        <div class="w-full border-y-2 border-dashed border-black py-2 mb-4">
            <div class="flex text-[10px] font-bold mb-2 uppercase">
                <div class="w-8">Cant</div>
                <div class="flex-1">Descrip.</div>
                <div class="w-16 text-right">Total</div>
            </div>
            
            <div *ngFor="let item of carrito()" class="flex text-[10px] mb-1">
                <div class="w-8 font-bold">{{item.cantidad}}</div>
                <div class="flex-1 pr-1 leading-3">
                    {{item.nombre}}
                    <div class="text-[9px] text-gray-600 mt-0.5" *ngIf="item.cantidad > 1">
                        {{item.cantidad}} x \${{item.precio.toFixed(2)}}
                    </div>
                </div>
                <div class="w-16 text-right font-medium">\${{item.subtotal.toFixed(2)}}</div>
            </div>
        </div>

        <div class="flex flex-col items-end mb-4 pr-1 space-y-1">
            <div class="flex justify-between w-40 text-[10px]">
                <span>SUBTOTAL:</span>
                <span>\${{subtotal().toFixed(2)}}</span>
            </div>
            <div class="flex justify-between w-40 text-[10px]">
                <span>IVA (16%):</span>
                <span>\${{iva().toFixed(2)}}</span>
            </div>
            <div class="flex justify-between w-40 text-lg font-bold border-t-2 border-black border-dashed mt-1 pt-1">
                <span>TOTAL:</span>
                <span>\${{total().toFixed(2)}}</span>
            </div>
        </div>

        <div class="border border-black rounded p-2 mb-6 text-[10px]">
            <div class="flex justify-between font-bold mb-1">
                <span>MÉTODO DE PAGO:</span>
                <span class="uppercase">{{metodoPago}}</span>
            </div>
            
            <div *ngIf="metodoPago === 'efectivo'">
                <div class="flex justify-between">
                    <span>EFECTIVO RECIBIDO:</span>
                    <span>\${{montoRecibido().toFixed(2)}}</span>
                </div>
                <div class="flex justify-between font-bold mt-1">
                    <span>CAMBIO ENTREGADO:</span>
                    <span>\${{cambio().toFixed(2)}}</span>
                </div>
            </div>
        </div>

        <div class="text-center space-y-2">
            <p class="text-[10px] font-bold">¡GRACIAS POR SU COMPRA!</p>
            <p class="text-[9px]">Conserve este ticket para cambios</p>
            
            <div class="barcode h-12 w-full mt-4"></div>
            <p class="text-[8px] tracking-[0.3em] mt-1">{{ticketId}}</p>
        </div>
    </div>
  `,
  styles: [`
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-down {
      animation: fadeInDown 0.3s ease-out;
    }
    
    /* Generador de Código de Barras Falso con CSS */
    .barcode {
        background: repeating-linear-gradient(
            to right,
            #000 0px, #000 2px,
            transparent 2px, transparent 4px,
            #000 4px, #000 5px,
            transparent 5px, transparent 9px,
            #000 9px, #000 12px,
            transparent 12px, transparent 13px,
            #000 13px, #000 14px,
            transparent 14px, transparent 16px,
            #000 16px, #000 19px,
            transparent 19px, transparent 24px,
            #000 24px, #000 25px
        );
    }
  `]
})
export class PosVentaComponent {
  private posService = inject(PosService);
  
  metodosPago: ('efectivo' | 'tarjeta' | 'transferencia')[] = ['efectivo', 'tarjeta', 'transferencia'];
  
  carrito = signal<ProductoVenta[]>([]);
  rawProductos: any[] = productosData.productos; 
  productosFiltrados = signal<any[]>(this.rawProductos);
  searchTerm = '';
  
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia' = 'efectivo';
  montoRecibido = signal<number>(0);
  
  ticketId = '';
  fechaTicket = new Date();

  subtotal = computed(() => this.carrito().reduce((acc, el) => acc + el.subtotal, 0));
  iva = computed(() => this.subtotal() * 0.16);
  total = computed(() => this.subtotal() + this.iva());

  cambio = computed(() => {
    if (this.metodoPago !== 'efectivo') return 0;
    return this.montoRecibido() - this.total();
  });

  filtrar() {
    const term = this.searchTerm.toLowerCase();
    this.productosFiltrados.set(
        this.rawProductos.filter(p => p.nombre.toLowerCase().includes(term))
    );
  }

  agregar(p: any) {
    this.carrito.update(curr => {
        const existente = curr.find(i => i.id === p.id);
        if (existente) {
            existente.cantidad++;
            existente.subtotal = existente.cantidad * existente.precio;
            return [...curr];
        }
        return [...curr, { ...p, cantidad: 1, subtotal: p.precio }];
    });
  }

  modificarCantidad(index: number, delta: number) {
    this.carrito.update(curr => {
        const item = curr[index];
        item.cantidad += delta;
        item.subtotal = item.cantidad * item.precio;
        if (item.cantidad <= 0) return curr.filter((_, i) => i !== index);
        return [...curr];
    });
  }

  limpiar() {
    this.carrito.set([]);
    this.montoRecibido.set(0);
    this.searchTerm = '';
    this.filtrar();
  }

  procesarVenta() {
    if (this.metodoPago === 'efectivo' && this.cambio() < 0) {
        alert("El monto recibido es insuficiente");
        return;
    }

    this.ticketId = `TKT-${Date.now().toString().slice(-6)}`;
    this.fechaTicket = new Date();

    const venta: Venta = {
        id: this.ticketId,
        fecha: this.fechaTicket.toISOString(),
        cliente: 'Mostrador',
        productos: this.carrito(),
        subtotal: this.subtotal(),
        iva: this.iva(),
        total: this.total(),
        metodoPago: this.metodoPago,
        montoRecibido: this.metodoPago === 'efectivo' ? this.montoRecibido() : undefined,
        cambio: this.metodoPago === 'efectivo' ? this.cambio() : undefined,
        cajero: 'Cajero 01', 
        estado: 'completada'
    };

    this.posService.registrarVenta(venta);
    
    setTimeout(() => {
        window.print();
        this.limpiar();
    }, 100);
  }
}