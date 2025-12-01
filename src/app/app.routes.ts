/**
 * ========================================================================
 * CONFIGURACIÓN DE RUTAS - NaturVida
 * ========================================================================
 * 
 * Sistema de rutas con 3 layouts independientes:
 * 
 * 1. E-COMMERCE (MainLayout)
 *    - Layout: Header + RouterOutlet + Footer
 *    - Público: Catálogo, productos, carrito
 *    - Requiere login para checkout
 * 
 * 2. SISTEMA POS (PosLayout) 
 *    - Layout: RouterOutlet sin decoración
 *    - Protegido: Requiere PIN (1234) mediante PosGuard
 *    - Módulos: Dashboard, Venta, Órdenes, Pedidos Online
 * 
 * 3. PANEL ADMIN (AdminLayout)
 *    - Layout: Sidebar colapsable + RouterOutlet
 *    - Protegido: Requiere login (admin@naturvida.com / admin123)
 *    - Módulos: Dashboard, Órdenes, Inventario, Reportes
 * 
 * ========================================================================
 */

import { Routes } from '@angular/router';

// Componentes E-commerce (eager loading)
import { HomeComponent } from './features/home/home.component';
import { ProductListComponent } from './features/products/product-list.component';
import { ProductDetailComponent } from './features/products/product-detail.component';
import { CartComponent } from './features/cart/cart.component';
import { LoginComponent } from './features/auth/login.component';

// Guards
import { PosGuard } from './core/guards/pos.guard';

// Layouts
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { PosLayoutComponent } from './layout/pos-layout/pos-layout.component';

export const routes: Routes = [
  
  // ========================================================================
  // SECCIÓN 1: E-COMMERCE (Público)
  // ========================================================================
  // Layout: MainLayout (Header + Footer)
  // URL Base: http://localhost:4200/
  // ========================================================================
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        // URL: http://localhost:4200/
      },
      {
        path: 'productos',
        component: ProductListComponent,
        // URL: http://localhost:4200/productos
      },
      {
        path: 'producto/:id',
        component: ProductDetailComponent,
        // URL: http://localhost:4200/producto/1
      },
      {
        path: 'carrito',
        component: CartComponent,
        // URL: http://localhost:4200/carrito
      },
      {
        path: 'login',
        component: LoginComponent,
        // URL: http://localhost:4200/login
      },
      {
        path: 'registro',
        loadComponent: () => import('./features/auth/registro.component').then(m => m.RegistroComponent),
        // URL: http://localhost:4200/registro
      }
    ]
  },

  // ========================================================================
  // SECCIÓN 2: SISTEMA POS (Empleados)
  // ========================================================================
  // Credenciales: PIN 1234
  // URL Base: http://localhost:4200/pos-login
  // ========================================================================
  
  // Login POS (sin layout - standalone)
  {
    path: 'pos-login',
    loadComponent: () => import('./features/pos/pos-login/pos-login.component').then(m => m.PosLoginComponent),
    // URL: http://localhost:4200/pos-login
    // Credencial: PIN 1234
  },

  // Módulos POS protegidos (con PosLayout)
  {
    path: 'pos',
    component: PosLayoutComponent,
    canActivate: [PosGuard], // Protegido: Requiere PIN 1234
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/pos/pos-dashboard/pos-dashboard.component').then(m => m.PosDashboardComponent),
        // URL: http://localhost:4200/pos/dashboard
        // KPIs en tiempo real, apertura/cierre de caja
      },
      {
        path: 'venta',
        loadComponent: () => import('./features/pos/pos-venta/pos-venta.component').then(m => m.PosVentaComponent),
        // URL: http://localhost:4200/pos/venta
        // Interfaz de punto de venta con tickets
      },
      {
        path: 'ordenes',
        loadComponent: () => import('./features/pos/pos-ordenes/pos-ordenes.component').then(m => m.PosOrdenesComponent),
        // URL: http://localhost:4200/pos/ordenes
        // Gestión de órdenes de mostrador
      },
      {
        path: 'pedidos-online',
        loadComponent: () => import('./features/pos/pos-pedidos-online/pos-pedidos-online.component').then(m => m.PosPedidosOnlineComponent),
        // URL: http://localhost:4200/pos/pedidos-online
        // Pedidos del e-commerce gestionados desde POS
      }
    ]
  },

  // ========================================================================
  // SECCIÓN 3: PANEL DE ADMINISTRACIÓN
  // ========================================================================
  // Credenciales: admin@naturvida.com / admin123
  // URL Base: http://localhost:4200/admin-login
  // ========================================================================
  
  // Login Admin (sin layout - standalone)
  {
    path: 'admin-login',
    loadComponent: () => import('./features/auth/admin-login.component').then(m => m.AdminLoginComponent),
    // URL: http://localhost:4200/admin-login
    // Credenciales: admin@naturvida.com / admin123
  },

  // Módulos Admin (con AdminLayout - sidebar colapsable)
  {
    path: 'admin',
    loadComponent: () => import('./layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    // TODO: Agregar AdminGuard para proteger estas rutas
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
        // URL: http://localhost:4200/admin/dashboard
        // KPIs globales del negocio
      },
      {
        path: 'ordenes',
        loadComponent: () => import('./features/admin/orders/admin-orders.component').then(m => m.AdminOrdersComponent),
        // URL: http://localhost:4200/admin/ordenes
        // Vista global de órdenes (POS + E-commerce)
      },
      {
        path: 'inventario',
        loadComponent: () => import('./features/admin/inventory/admin-inventory.component').then(m => m.AdminInventoryComponent),
        // URL: http://localhost:4200/admin/inventario
        // CRUD completo de productos con modal
      },
      {
        path: 'reportes',
        loadComponent: () => import('./features/admin/reports/admin-reports.component').then(m => m.AdminReportsComponent),
        // URL: http://localhost:4200/admin/reportes
        // Gráficas de ventas y análisis
      }
    ]
  },

  // ========================================================================
  // FALLBACK: Ruta por defecto
  // ========================================================================
  {
    path: '**',
    redirectTo: ''
  }
];