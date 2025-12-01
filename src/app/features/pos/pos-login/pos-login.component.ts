import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PosService } from '../../../core/services/pos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pos-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden p-4">
      
      <div class="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div class="absolute right-0 top-0 w-[500px] h-[500px] bg-primary-dark rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
          <div class="absolute left-0 bottom-0 w-[500px] h-[500px] bg-primary rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div class="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-sm relative z-10 border border-gray-100">
        
        <div class="text-center mb-10">
            <h1 class="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2 tracking-tight">
                <span class="text-primary">Natur</span>Vida
                <span class="text-xs bg-primary text-white px-2 py-0.5 rounded uppercase tracking-wider font-bold">POS</span>
            </h1>
            <p class="text-gray-500 font-medium text-sm mt-2 flex items-center justify-center gap-2">
                <i class="fas fa-id-badge text-primary/70"></i> Portal de Empleados
            </p>
        </div>

        <div class="space-y-8">
            <div class="space-y-2">
               <label for="pin_entry" class="block text-xs font-bold text-gray-500 text-center uppercase tracking-wide">
                 Ingrese su PIN de seguridad
               </label>
               <div class="relative group">
                  <input type="password" 
                         id="pin_entry"
                         [(ngModel)]="pin" 
                         maxlength="4"
                         placeholder="••••" 
                         class="w-full text-center text-3xl font-bold text-gray-800 py-4 px-4 border border-gray-200 rounded-xl bg-gray-50/50
                                focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 
                                transition-all outline-none placeholder:text-gray-300 tracking-widest"
                         (keyup.enter)="acceder()">
               </div>
               <p class="text-center text-xs text-gray-400">Introduce tu código de 4 dígitos</p>
            </div>

            @if (errorMessage) {
                <div class="bg-red-50 text-red-600 text-sm p-3 rounded-xl flex items-start gap-2 animate-shake">
                    <i class="fas fa-exclamation-circle mt-0.5"></i>
                    <span>{{ errorMessage }}</span>
                </div>
            }

            <button (click)="acceder()" 
                    [disabled]="pin.length !== 4 || isLoading"
                    class="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-base hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none flex justify-center items-center gap-2">
                @if (isLoading) {
                    <i class="fas fa-spinner fa-spin"></i> Verificando...
                } @else {
                    Iniciar Turno <i class="fas fa-arrow-right"></i>
                }
            </button>
        </div>
        
        <div class="mt-10 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          &copy; {{ currentYear }} NaturVida. Sistema de Punto de Venta.
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Mismo estilo para el placeholder del PIN */
    input[type="password"]::placeholder {
        letter-spacing: 0.5em;
        transform: translateX(0.25em); /* Pequeño ajuste óptico */
    }
    .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
    @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
  `]
})
export class PosLoginComponent {
  pin = '';
  currentYear = new Date().getFullYear();
  isLoading = false;
  errorMessage = '';
  
  private router = inject(Router);
  private posService = inject(PosService);

  acceder() {
    if (this.pin.length !== 4) return;

    this.isLoading = true;
    this.errorMessage = '';

    setTimeout(() => {
        if (this.pin === '1234') {
            localStorage.setItem('naturvida_pos_empleado', 'true');
            this.posService.abrirCaja(0, 'Juan Pérez');
            this.router.navigate(['/pos/dashboard']);
        } else {
            this.errorMessage = 'PIN incorrecto. Inténtalo de nuevo.';
            this.pin = '';
            this.isLoading = false;
        }
    }, 800);
  }
}