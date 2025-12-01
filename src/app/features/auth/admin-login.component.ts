import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden p-4">
      
      <div class="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div class="absolute right-0 top-0 w-[500px] h-[500px] bg-gray-800 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
          <div class="absolute left-0 bottom-0 w-[500px] h-[500px] bg-primary rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div class="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-sm relative z-10 border border-gray-100">
        
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2 tracking-tight">
                <span class="text-primary">Natur</span>Vida
                <span class="text-xs bg-gray-800 text-white px-2 py-0.5 rounded uppercase tracking-wider font-bold">Admin</span>
            </h1>
            <p class="text-gray-500 font-medium text-sm mt-2 flex items-center justify-center gap-2">
                <i class="fas fa-shield-alt text-gray-400"></i> Panel de Gestión y Control
            </p>
        </div>

        <form (ngSubmit)="login()" class="space-y-5">
            
            <div class="space-y-1">
                <label for="email" class="text-xs font-bold text-gray-500 uppercase tracking-wide">Correo Electrónico</label>
                <div class="relative group">
                    <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"></i>
                    <input type="email" id="email" [(ngModel)]="credentials.email" name="email"
                           class="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-800 font-medium bg-gray-50/50 focus:bg-white"
                           placeholder="ej. admin@naturvida.com">
                </div>
            </div>

            <div class="space-y-1">
                <label for="password" class="text-xs font-bold text-gray-500 uppercase tracking-wide">Contraseña</label>
                <div class="relative group">
                    <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"></i>
                    <input [type]="showPassword ? 'text' : 'password'" id="password" [(ngModel)]="credentials.password" name="password"
                           class="w-full pl-11 pr-11 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-gray-800 font-medium bg-gray-50/50 focus:bg-white"
                           placeholder="••••••••">
                    <button type="button" (click)="showPassword = !showPassword"
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none">
                        <i class="fas" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
                    </button>
                </div>
            </div>

            @if (errorMessage) {
                <div class="bg-red-50 text-red-600 text-sm p-3 rounded-xl flex items-start gap-2 animate-shake">
                    <i class="fas fa-exclamation-circle mt-0.5"></i>
                    <span>{{ errorMessage }}</span>
                </div>
            }

            <button type="submit" 
                    [disabled]="isLoading"
                    class="w-full bg-gray-800 text-white py-3.5 rounded-xl font-bold text-base hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none flex justify-center items-center gap-2">
                @if (isLoading) {
                    <i class="fas fa-spinner fa-spin"></i> Verificando...
                } @else {
                    Ingresar al Panel <i class="fas fa-arrow-right"></i>
                }
            </button>
        </form>
        
        <div class="mt-8 text-center">
            <a routerLink="/" class="text-sm font-medium text-gray-500 hover:text-primary transition-colors inline-flex items-center gap-1">
                <i class="fas fa-arrow-left"></i> Volver a la tienda
            </a>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          &copy; {{ currentYear }} NaturVida. Todos los derechos reservados.
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
    @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
  `]
})
export class AdminLoginComponent {
  private router = inject(Router);
  
  currentYear = new Date().getFullYear();
  credentials = { email: '', password: '' };
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  login() {
    this.errorMessage = '';
    this.isLoading = true;

    setTimeout(() => {
        if (this.credentials.email === 'admin@naturvida.com' && this.credentials.password === 'admin123') {
            localStorage.setItem('naturvida_admin_token', 'mock_token_secure_123');
            this.router.navigate(['/admin/dashboard']);
        } else {
            this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
            this.isLoading = false;
        }
    }, 1500);
  }
}