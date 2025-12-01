import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <footer class="bg-gradient-to-b from-white to-primary/5 border-t border-light mt-16 font-sans">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div class="space-y-4">
            <div class="flex items-center gap-2 mb-4">
              <i class="fas fa-leaf text-primary text-2xl"></i>
              <span class="text-xl font-bold text-dark">NaturVida</span>
            </div>
            <p class="text-medium text-sm leading-relaxed">
              Tu tienda de confianza para productos naturales y orgánicos. 
              Conectando con la naturaleza, un producto a la vez.
            </p>
            <div class="flex gap-3">
              <a href="#" class="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center text-primary transition-all duration-300">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center text-primary transition-all duration-300">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white rounded-full flex items-center justify-center text-primary transition-all duration-300">
                <i class="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="font-semibold text-dark text-lg">Enlaces Rápidos</h3>
            <ul class="space-y-2 text-sm">
              <li><a routerLink="/productos" class="text-medium hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Productos</a></li>
              <li><a routerLink="/ofertas" class="text-medium hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Ofertas</a></li>
              <li><a routerLink="/nosotros" class="text-medium hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Sobre Nosotros</a></li>
              <li><a routerLink="/blog" class="text-medium hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Blog</a></li>
              <li><a routerLink="/contacto" class="text-medium hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Contacto</a></li>
            </ul>
          </div>

          <div class="space-y-4">
            <h3 class="font-semibold text-dark text-lg">Atención al Cliente</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="text-medium hover:text-primary transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" class="text-medium hover:text-primary transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="#" class="text-medium hover:text-primary transition-colors">Políticas de Privacidad</a></li>
              <li><a href="#" class="text-medium hover:text-primary transition-colors">Términos y Condiciones</a></li>
              <li><a routerLink="/mis-ordenes" class="text-medium hover:text-primary transition-colors">Rastrear Orden</a></li>
            </ul>
          </div>

          <div class="space-y-4">
            <h3 class="font-semibold text-dark text-lg">Suscríbete</h3>
            <p class="text-medium text-sm">
              Recibe ofertas exclusivas y tips de vida saludable.
            </p>
            
            <div class="space-y-3">
              <div class="relative">
                <input type="email" 
                       [formControl]="emailControl"
                       placeholder="Tu correo electrónico"
                       class="w-full px-4 py-2 rounded-lg border border-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm">
              </div>
              
              <button (click)="onSubscribe()"
                      [disabled]="emailControl.invalid || isSubscribed()"
                      class="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2">
                <span *ngIf="!isSubscribed()">Suscribirse</span>
                <span *ngIf="isSubscribed()"><i class="fas fa-check"></i> ¡Listo!</span>
              </button>
              
              <p *ngIf="emailControl.invalid && emailControl.touched" class="text-xs text-red-500">
                Ingresa un correo válido.
              </p>
            </div>

            <div class="pt-4 space-y-2">
              <p class="text-sm text-medium flex items-center gap-2">
                <i class="fas fa-phone text-primary"></i>
                <span>+52 55 1234 5678</span>
              </p>
              <p class="text-sm text-medium flex items-center gap-2">
                <i class="fas fa-envelope text-primary"></i>
                <span>info@naturvida.mx</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-light bg-white">
        <div class="container mx-auto px-4 py-4">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-sm text-medium">
              © {{ currentYear }} NaturVida. Todos los derechos reservados.
            </p>
            <div class="flex items-center gap-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <i class="fab fa-cc-visa text-2xl"></i>
              <i class="fab fa-cc-mastercard text-2xl"></i>
              <i class="fab fa-cc-paypal text-2xl"></i>
              <i class="fab fa-cc-amex text-2xl"></i>
              <span class="text-xs text-medium ml-2">Pago 100% Seguro</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  isSubscribed = signal(false);

  onSubscribe() {
    if (this.emailControl.valid) {
      console.log('Newsletter suscripción:', this.emailControl.value);
      
      this.isSubscribed.set(true);
      this.emailControl.disable();
      setTimeout(() => {
        this.isSubscribed.set(false);
        this.emailControl.enable();
        this.emailControl.reset();
      }, 3000);
    } else {
      this.emailControl.markAsTouched();
    }
  }
}