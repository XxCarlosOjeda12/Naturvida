import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="relative bg-primary py-24 overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-sm">
          Bienestar Natural <br/> a tu Alcance
        </h1>
        <p class="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
          Descubre nuestra selección de productos orgánicos, suplementos y aceites esenciales para una vida más saludable.
        </p>
        <button routerLink="/productos" 
                class="bg-white text-primary font-bold py-4 px-10 rounded-full hover:bg-dark hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Ver Catálogo
        </button>
      </div>
    </section>

    <section class="py-20 px-4 max-w-7xl mx-auto">
      <h3 class="text-3xl font-bold text-dark text-center mb-16">Categorías Populares</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div class="bg-white p-10 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 text-center border border-light group cursor-pointer">
          <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
            <i class="fas fa-leaf text-3xl text-primary group-hover:text-white"></i>
          </div>
          <h4 class="font-bold text-xl mb-3 text-dark">Aceites Esenciales</h4>
          <p class="text-medium text-sm">Aromaterapia pura para tu hogar.</p>
        </div>
        
        <div class="bg-white p-10 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 text-center border border-light group cursor-pointer">
          <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
            <i class="fas fa-capsules text-3xl text-primary group-hover:text-white"></i>
          </div>
          <h4 class="font-bold text-xl mb-3 text-dark">Suplementos</h4>
          <p class="text-medium text-sm">Vitaminas y minerales naturales.</p>
        </div>

        <div class="bg-white p-10 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 text-center border border-light group cursor-pointer">
          <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
            <i class="fas fa-spa text-3xl text-primary group-hover:text-white"></i>
          </div>
          <h4 class="font-bold text-xl mb-3 text-dark">Cuidado Personal</h4>
          <p class="text-medium text-sm">Cosmética libre de químicos.</p>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {}