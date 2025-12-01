import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-settings-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" (click)="close.emit()"></div>
      
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-fade-in-up">
        
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 class="text-lg font-bold text-gray-800 flex items-center gap-2">
            <i class="fas fa-cog text-gray-400"></i> Configuración General
          </h2>
          <button (click)="close.emit()" class="text-gray-400 hover:text-gray-600 transition-colors">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <div class="p-6 space-y-6">
            <!-- Nombre Tienda -->
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-500 uppercase tracking-wide">Nombre de la Tienda</label>
                <div class="relative group">
                    <i class="fas fa-store absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"></i>
                    <input type="text" [(ngModel)]="settings.shopName" 
                        class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-800 font-medium transition-all">
                </div>
            </div>

            <!-- Email Contacto -->
            <div class="space-y-1.5">
                <label class="text-xs font-bold text-gray-500 uppercase tracking-wide">Email de Contacto</label>
                <div class="relative group">
                    <i class="fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"></i>
                    <input type="email" [(ngModel)]="settings.email" 
                        class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-800 font-medium transition-all">
                </div>
            </div>

            <div class="grid grid-cols-2 gap-5">
                <!-- Impuesto -->
                <div class="space-y-1.5">
                    <label class="text-xs font-bold text-gray-500 uppercase tracking-wide">Impuesto (%)</label>
                    <div class="relative group">
                        <i class="fas fa-percent absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors text-xs"></i>
                        <input type="number" [(ngModel)]="settings.tax" 
                            class="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-gray-800 font-medium transition-all">
                    </div>
                </div>
                <!-- Moneda -->
                <div class="space-y-1.5">
                    <label class="text-xs font-bold text-gray-500 uppercase tracking-wide">Moneda</label>
                    <div class="relative">
                        <select [(ngModel)]="settings.currency" class="w-full pl-4 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white text-gray-800 font-medium appearance-none transition-all">
                            <option value="USD">USD ($)</option>
                            <option value="MXN">MXN ($)</option>
                            <option value="EUR">EUR (€)</option>
                        </select>
                        <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
                    </div>
                </div>
            </div>

            <!-- Toggle Mantenimiento (CORREGIDO) -->
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm border border-gray-100">
                        <i class="fas fa-tools" [class.text-primary]="settings.maintenance"></i>
                    </div>
                    <div>
                        <p class="font-bold text-gray-700 text-sm">Modo Mantenimiento</p>
                        <p class="text-xs text-gray-400">Desactiva la tienda pública</p>
                    </div>
                </div>
                
                <!-- Toggle Switch Estándar -->
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" [(ngModel)]="settings.maintenance" class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
            </div>
        </div>

        <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <button (click)="close.emit()" class="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-colors">Cancelar</button>
            <button (click)="save.emit(settings)" class="px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5">Guardar Cambios</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-fade-in-up { animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  `]
})
export class AdminSettingsModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  settings = {
    shopName: 'NaturVida Store',
    email: 'contacto@naturvida.com',
    tax: 16,
    currency: 'MXN',
    maintenance: false
  };
}