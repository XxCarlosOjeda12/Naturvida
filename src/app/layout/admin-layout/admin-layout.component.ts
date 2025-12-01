import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="flex h-screen bg-gray-50 font-sans overflow-hidden">
      
      <aside class="bg-white border-r border-gray-200 flex flex-col shadow-xl z-20 transition-all duration-300 ease-in-out relative"
             [class.w-64]="sidebarOpen()"
             [class.w-20]="!sidebarOpen()">
        
        <button (click)="toggleSidebar()"
                class="absolute -right-3 top-9 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors z-50 focus:outline-none">
            <i class="fas" [class.fa-chevron-left]="sidebarOpen()" [class.fa-chevron-right]="!sidebarOpen()"></i>
        </button>
        
        <div class="h-20 flex items-center px-6 border-b border-gray-100 overflow-hidden whitespace-nowrap shrink-0">
          <div class="w-8 h-8 min-w-[2rem] bg-dark rounded-lg flex items-center justify-center text-white shadow-md shadow-dark/30 transition-transform duration-300"
               [class.mr-3]="sidebarOpen()"
               [class.mx-auto]="!sidebarOpen()">
            <i class="fas fa-shield-alt"></i>
          </div>
          <div class="transition-opacity duration-200" [class.opacity-0]="!sidebarOpen()" [class.hidden]="!sidebarOpen()">
             <h1 class="text-xl font-extrabold text-gray-800 tracking-tight">Natur<span class="text-primary">Admin</span></h1>
          </div>
        </div>

        <nav class="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          
          <p class="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 transition-opacity duration-300 h-4"
             [class.opacity-0]="!sidebarOpen()"
             [class.text-center]="!sidebarOpen()">
             {{ sidebarOpen() ? 'General' : '•••' }}
          </p>
          
          <a routerLink="/admin/dashboard" 
             routerLinkActive="bg-primary/10 text-primary font-bold shadow-sm" 
             class="flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-primary transition-all group relative overflow-hidden whitespace-nowrap mb-1"
             [title]="!sidebarOpen() ? 'Dashboard' : ''">
            <i class="fas fa-chart-pie w-6 text-center text-lg transition-colors group-hover:text-primary"></i>
            <span class="ml-3 transition-opacity duration-300" [class.opacity-0]="!sidebarOpen()">Dashboard</span>
          </a>

          <a routerLink="/admin/ordenes" 
             routerLinkActive="bg-primary/10 text-primary font-bold shadow-sm"
             class="flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-primary transition-all group relative overflow-hidden whitespace-nowrap mb-1"
             [title]="!sidebarOpen() ? 'Órdenes' : ''">
            <i class="fas fa-clipboard-list w-6 text-center text-lg transition-colors group-hover:text-primary"></i>
            <span class="ml-3 transition-opacity duration-300" [class.opacity-0]="!sidebarOpen()">Órdenes (Global)</span>
          </a>

          <p class="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-6 mb-2 transition-opacity duration-300 h-4"
             [class.opacity-0]="!sidebarOpen()"
             [class.text-center]="!sidebarOpen()">
             {{ sidebarOpen() ? 'Gestión' : '•••' }}
          </p>

          <a routerLink="/admin/inventario" 
             routerLinkActive="bg-primary/10 text-primary font-bold shadow-sm"
             class="flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-primary transition-all group relative overflow-hidden whitespace-nowrap mb-1"
             [title]="!sidebarOpen() ? 'Inventario' : ''">
            <i class="fas fa-boxes w-6 text-center text-lg transition-colors group-hover:text-primary"></i>
            <span class="ml-3 transition-opacity duration-300" [class.opacity-0]="!sidebarOpen()">Inventario</span>
          </a>

          <a routerLink="/admin/reportes" 
             routerLinkActive="bg-primary/10 text-primary font-bold shadow-sm"
             class="flex items-center px-3 py-3 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-primary transition-all group relative overflow-hidden whitespace-nowrap mb-1"
             [title]="!sidebarOpen() ? 'Reportes' : ''">
            <i class="fas fa-file-invoice-dollar w-6 text-center text-lg transition-colors group-hover:text-primary"></i>
            <span class="ml-3 transition-opacity duration-300" [class.opacity-0]="!sidebarOpen()">Reportes</span>
          </a>

        </nav>

        <div class="p-4 border-t border-gray-100 bg-gray-50/50 overflow-hidden whitespace-nowrap shrink-0">
          <div class="flex items-center" [class.justify-center]="!sidebarOpen()" [class.justify-start]="sidebarOpen()">
            <div class="w-10 h-10 min-w-[2.5rem] rounded-full bg-white flex items-center justify-center text-dark border border-gray-200 shadow-sm">
              <span class="font-bold text-xs">AD</span>
            </div>
            
            <div class="ml-3 min-w-0 transition-opacity duration-300" [class.opacity-0]="!sidebarOpen()" [class.hidden]="!sidebarOpen()">
              <p class="text-sm font-bold text-gray-800 truncate max-w-[120px]">Administrador</p>
              <button (click)="logout()" class="text-xs text-red-500 font-bold hover:underline flex items-center gap-1">
                <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div class="flex-1 flex flex-col overflow-hidden relative bg-gray-50/50">
        <router-outlet></router-outlet>
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
  `]
})
export class AdminLayoutComponent {
  private router = inject(Router);
  sidebarOpen = signal(true);

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

  logout() {
    if(confirm('¿Cerrar sesión de administrador?')) {
        localStorage.removeItem('naturvida_admin_token');
        this.router.navigate(['/admin-login']);
    }
  }
}