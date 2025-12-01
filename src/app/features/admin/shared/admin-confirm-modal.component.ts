import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-[60] flex items-center justify-center p-4">
      
      <!-- Backdrop (Click cierra) -->
      <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
           (click)="cancel.emit()"></div>
      
      <!-- Modal Card -->
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-bounce-in">
        
        <div class="p-6 text-center">
            <!-- Icono Dinámico -->
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm"
                 [ngClass]="type === 'danger' ? 'bg-red-50 text-red-500' : 'bg-yellow-50 text-yellow-500'">
                <i class="fas" [ngClass]="type === 'danger' ? 'fa-trash-alt' : 'fa-exclamation-triangle'"></i>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mb-2">{{ title }}</h3>
            <p class="text-gray-500 text-sm mb-6 leading-relaxed">
                {{ message }}
            </p>

            <!-- Botones de Acción -->
            <div class="flex gap-3 justify-center">
                <button (click)="cancel.emit()" 
                        class="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors w-full">
                    Cancelar
                </button>
                <button (click)="confirm.emit()" 
                        class="px-5 py-2.5 rounded-xl text-white font-bold shadow-lg transition-all transform hover:-translate-y-0.5 w-full flex items-center justify-center gap-2"
                        [ngClass]="type === 'danger' 
                            ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30' 
                            : 'bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/30'">
                    <i class="fas" [ngClass]="type === 'danger' ? 'fa-trash-alt' : 'fa-check'"></i>
                    {{ actionText }}
                </button>
            </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes bounceIn {
        0% { opacity: 0; transform: scale(0.9); }
        50% { opacity: 1; transform: scale(1.02); }
        100% { transform: scale(1); }
    }
    .animate-bounce-in { animation: bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
  `]
})
export class AdminConfirmModalComponent {
  @Input() title: string = '¿Estás seguro?';
  @Input() message: string = 'Esta acción no se puede deshacer.';
  @Input() actionText: string = 'Confirmar';
  @Input() type: 'danger' | 'warning' = 'danger'; 
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}