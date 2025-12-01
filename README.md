# NaturVida - E-commerce de Productos Naturales

Tienda online moderna de productos orgánicos y naturales desarrollada con Angular 21 y TailwindCSS.

## Descripción del Proyecto

**NaturVida** es una aplicación web de comercio electrónico especializada en la venta de productos naturales, orgánicos y saludables. Ofrece una experiencia de usuario moderna, intuitiva y completamente responsiva, con tres sistemas independientes: E-commerce, Sistema POS y Panel de Administración.

## Acceso Rápido y Credenciales

### URLs del Sistema

**E-commerce (Público)**
- Inicio: `http://localhost:4200/`
- Productos: `http://localhost:4200/productos`
- Carrito: `http://localhost:4200/carrito`
- Login Cliente: `http://localhost:4200/login`

**Sistema POS (Empleados)**
- Login POS: `http://localhost:4200/pos-login`
  - **PIN de acceso:** `1234`
- Dashboard POS: `http://localhost:4200/pos/dashboard`
- Punto de Venta: `http://localhost:4200/pos/venta`
- Órdenes: `http://localhost:4200/pos/ordenes`
- Pedidos Online: `http://localhost:4200/pos/pedidos-online`

**Panel de Administración**
- Login Admin: `http://localhost:4200/admin-login`
  - **Email:** `admin@naturvida.com`
  - **Password:** `admin123`
- Dashboard Admin: `http://localhost:4200/admin/dashboard`
- Órdenes Globales: `http://localhost:4200/admin/ordenes`
- Inventario: `http://localhost:4200/admin/inventario`
- Reportes: `http://localhost:4200/admin/reportes`

### Características Principales

#### E-commerce
- **Catálogo de Productos**: 8 productos con imágenes, precios, descuentos y etiquetas
- **Carrito de Compras**: Gestión completa con localStorage y contador reactivo
- **Sistema de Autenticación**: Login y registro con gestión de sesión
- **Gestión de Órdenes**: Creación automática de pedidos con número único
- **Diseño Responsivo**: Interfaz adaptable a móviles, tablets y desktop
- **Newsletter**: Formulario reactivo de suscripción en footer
- **Búsqueda Visual**: Barra de búsqueda integrada en header
- **Checkout Protegido**: Validación de login antes de comprar

#### Sistema POS (Punto de Venta)
- **POS Independiente**: Sistema completo de punto de venta desacoplado del e-commerce
- **Acceso con PIN**: Login seguro para empleados (PIN: 1234)
- **Apertura de Caja**: Control de fondo inicial y arqueo
- **Venta en Mostrador**: Interfaz táctil optimizada para ventas rápidas con búsqueda
- **Impresión de Tickets**: Generación automática de tickets térmicos (80mm)
- **Dashboard POS**: KPIs en tiempo real (ventas, tickets, promedio, caja)
- **Gestión de Órdenes**: Control de pedidos de mostrador con estados
- **Pedidos Online**: Módulo separado para gestionar compras desde la web/app
- **Múltiples Métodos de Pago**: Efectivo (con cálculo de cambio), tarjeta, transferencia
- **Historial de Ventas**: Registro completo de transacciones del día
- **Sidebar Colapsable**: Navegación optimizada con iconos y tooltips
- **Reloj en Tiempo Real**: Visualización de hora actual en dashboard

#### Panel de Administración
- **Dashboard Administrativo**: KPIs globales con ventas totales, ticket promedio, productos vendidos
- **Gestión de Órdenes Global**: Vista unificada de pedidos POS y E-commerce con filtros
- **Inventario Avanzado**: CRUD completo de productos con modal de creación/edición
- **Reportes Analíticos**: Gráficas de ventas mensuales y top productos con animaciones
- **Sidebar Colapsable**: Navegación consistente con sistema POS
- **Autenticación Segura**: Login independiente con credenciales de administrador
- **Búsqueda en Tiempo Real**: Filtro instantáneo de productos en inventario
- **Indicadores de Stock**: Alertas visuales por niveles de inventario

#### Arquitectura y Tecnología
- **Signals de Angular 21**: Estado reactivo con la nueva API de Signals
- **TailwindCSS**: Diseño moderno con paleta personalizada de colores naturales
- **Standalone Components**: Arquitectura sin NgModules
- **Route Guards**: Protección de rutas POS con guards funcionales
- **Layouts Múltiples**: Tres layouts independientes (MainLayout, PosLayout, AdminLayout)
- **Lazy Loading**: Carga diferida de módulos para optimización de rendimiento

## Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| **Angular** | 21.0.0 | Framework principal |
| **TypeScript** | 5.9.2 | Lenguaje de programación |
| **TailwindCSS** | 3.4.17 | Framework de estilos |
| **RxJS** | 7.8.0 | Programación reactiva |
| **Vitest** | 4.0.8 | Testing framework |
| **Font Awesome** | - | Iconos |

## Estructura del Proyecto

La aplicación está organizada en una arquitectura modular clara que separa el e-commerce, el sistema POS y el panel de administración:

```
natur-vida/
├── src/
│   ├── app/
│   │   │
│   │   ├── core/                           # NÚCLEO - Servicios y Modelos
│   │   │   │
│   │   │   ├── guards/
│   │   │   │   └── pos.guard.ts            # Guard funcional para proteger rutas POS
│   │   │   │
│   │   │   ├── models/
│   │   │   │   ├── natur-vida.models.ts    # Interfaces: Producto, Usuario, Orden, ProductoCarrito
│   │   │   │   └── pos.models.ts           # Interfaces POS: Venta, ProductoVenta, CajaEstado, Orden
│   │   │   │
│   │   │   └── services/
│   │   │       ├── auth.service.ts         # Autenticación (login/register/logout) con Signals
│   │   │       ├── cart.service.ts         # Carrito de compras con Signals y localStorage
│   │   │       ├── order.service.ts        # Gestión de órdenes del e-commerce
│   │   │       ├── product.service.ts      # Productos (HttpClient + Observable)
│   │   │       └── pos.service.ts          # Servicio POS (ventas, caja, KPIs) con Signals
│   │   │
│   │   │
│   │   ├── features/                       # FUNCIONALIDADES - Componentes de negocio
│   │   │   │
│   │   │   ├── auth/                       # Autenticación
│   │   │   │   ├── admin-login.component.ts    # Login de administradores
│   │   │   │   ├── login.component.ts          # Login de clientes
│   │   │   │   └── registro.component.ts       # Registro de clientes
│   │   │   │
│   │   │   ├── cart/                       # Carrito
│   │   │   │   └── cart.component.ts       # Vista del carrito con checkout
│   │   │   │
│   │   │   ├── home/                       # Inicio
│   │   │   │   └── home.component.ts       # Página principal del e-commerce
│   │   │   │
│   │   │   ├── products/                   # Productos
│   │   │   │   ├── product-list.component.ts   # Listado de productos (grid)
│   │   │   │   └── product-detail.component.ts # Detalle individual de producto
│   │   │   │
│   │   │   ├── admin/                      # PANEL DE ADMINISTRACIÓN
│   │   │   │   │
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── admin-dashboard.component.ts    # Dashboard con KPIs globales
│   │   │   │   │
│   │   │   │   ├── orders/
│   │   │   │   │   └── admin-orders.component.ts       # Gestión global de órdenes
│   │   │   │   │
│   │   │   │   ├── inventory/
│   │   │   │   │   ├── admin-inventory.component.ts    # CRUD de productos
│   │   │   │   │   └── admin-product-modal.component.ts # Modal crear/editar producto
│   │   │   │   │
│   │   │   │   └── reports/
│   │   │   │       └── admin-reports.component.ts      # Reportes y gráficas
│   │   │   │
│   │   │   └── pos/                        # SISTEMA POS (Independiente)
│   │   │       │
│   │   │       ├── pos-login/
│   │   │       │   └── pos-login.component.ts          # Login con PIN para empleados
│   │   │       │
│   │   │       ├── pos-dashboard/
│   │   │       │   └── pos-dashboard.component.ts      # Dashboard: KPIs, sidebar, ventas
│   │   │       │
│   │   │       ├── pos-venta/
│   │   │       │   └── pos-venta.component.ts          # Interfaz de venta con búsqueda y ticket
│   │   │       │
│   │   │       ├── pos-ordenes/
│   │   │       │   ├── pos-ordenes.component.ts        # Gestión de órdenes de mostrador
│   │   │       │   └── pos-orden-detalle.component.ts  # Modal de detalle de orden (reutilizable)
│   │   │       │
│   │   │       └── pos-pedidos-online/
│   │   │           └── pos-pedidos-online.component.ts # Gestión de pedidos web/app
│   │   │
│   │   │
│   │   ├── layout/                         # LAYOUTS - Estructuras de página
│   │   │   │
│   │   │   ├── main-layout/
│   │   │   │   └── main-layout.component.ts    # Layout principal (Header + RouterOutlet + Footer)
│   │   │   │
│   │   │   ├── pos-layout/
│   │   │   │   └── pos-layout.component.ts     # Layout POS (RouterOutlet sin decoración)
│   │   │   │
│   │   │   ├── admin-layout/
│   │   │   │   └── admin-layout.component.ts   # Layout Admin (Sidebar colapsable + RouterOutlet)
│   │   │   │
│   │   │   ├── header/
│   │   │   │   └── header.component.ts         # Header con menú, búsqueda, carrito
│   │   │   │
│   │   │   └── footer/
│   │   │       └── footer.component.ts         # Footer con newsletter y enlaces
│   │   │
│   │   │
│   │   ├── shared/                         # COMPARTIDO - Componentes reutilizables
│   │   │   └── components/
│   │   │       └── product-card/
│   │   │           └── product-card.component.ts   # Card de producto con @Input/@Output
│   │   │
│   │   │
│   │   ├── app.config.ts                   # Configuración principal (providers, HttpClient)
│   │   ├── app.routes.ts                   # Sistema de rutas con layouts diferenciados
│   │   ├── app.html                        # Template raíz (solo router-outlet)
│   │   ├── app.ts                          # Componente raíz (AppComponent)
│   │   └── app.spec.ts                     # Tests del componente raíz
│   │
│   │
│   ├── assets/                             # RECURSOS ESTÁTICOS
│   │   └── data/
│   │       └── productos.json              # Catálogo de 8 productos (JSON)
│   │
│   │
│   ├── styles.css                          # Estilos globales + Tailwind directives
│   ├── index.html                          # HTML principal
│   └── main.ts                             # Punto de entrada de la aplicación
│
│
├── angular.json                            # Configuración de Angular CLI
├── tailwind.config.js                      # Configuración de Tailwind (colores personalizados)
├── tsconfig.json                           # Configuración de TypeScript
├── tsconfig.app.json                       # TypeScript específico para la app
└── package.json                            # Dependencias y scripts
```

### Organización por Responsabilidades

#### **Core** (Servicios Centrales)
- **Guards**: Protección de rutas (funcionales, no basados en clases)
- **Models**: Definición de interfaces TypeScript
- **Services**: Lógica de negocio con Signals y Observables

#### **Features** (Funcionalidades)
- **E-commerce**: Auth, Cart, Home, Products
- **POS**: Sistema completo de punto de venta (5 componentes + modal)
- **Admin**: Panel de administración completo (4 componentes + modal)

#### **Layout** (Estructuras)
- **MainLayout**: Para rutas del e-commerce (con header/footer)
- **PosLayout**: Para rutas POS (interfaz limpia)
- **AdminLayout**: Para rutas del panel de administración (sidebar colapsable)

#### **Shared** (Reutilizables)
- Componentes que se usan en múltiples lugares (ProductCard)

## Funcionalidades Implementadas

### 1. Gestión de Productos
- Listado de productos con grid responsivo
- Detalle de producto individual
- Filtrado por categorías
- Productos destacados y nuevos
- Sistema de descuentos

### 2. Carrito de Compras
- Agregar/eliminar productos
- Actualizar cantidades
- Cálculo automático de subtotales y total
- Persistencia en localStorage
- Contador reactivo en header

### 3. Autenticación y Registro
- Login simulado con email y nombre
- Registro completo con teléfono y dirección
- Gestión de sesión con localStorage
- Protección de checkout (requiere login)
- Signal reactivo de usuario actual
- Menú desplegable de usuario en header
- Logout con confirmación

### 4. Sistema de Órdenes
- Creación de pedidos
- Generación de número de orden único
- Historial de órdenes
- Estados de pedidos

### 5. Sistema POS Completo
- Apertura y cierre de caja con arqueo
- Registro de ventas con múltiples métodos de pago
- Impresión de tickets térmicos
- Dashboard con KPIs en tiempo real
- Gestión de órdenes de mostrador
- Integración con pedidos online del e-commerce

### 6. Panel de Administración
- Dashboard con métricas globales del negocio
- Gestión unificada de órdenes (POS + E-commerce)
- CRUD completo de productos con modal
- Reportes analíticos con gráficas de ventas
- Indicadores de stock y alertas de inventario
- Autenticación independiente para administradores

## Instalación y Configuración

### Prerrequisitos
- **Node.js** v18 o superior ([Descargar](https://nodejs.org/))
- **npm** v10 o superior (incluido con Node.js)
- **Angular CLI** v21 (se instalará automáticamente)

### Pasos de Instalación

#### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd NaturVida/natur-vida
```

#### 2. Instalar dependencias
```bash
npm install
```

Este comando instalará todas las dependencias necesarias:
- Angular 21.0.0
- TailwindCSS 3.4.17
- RxJS 7.8.0
- TypeScript 5.9.2
- Vitest 4.0.8

#### 3. Verificar instalación (opcional)
```bash
ng version
```

Deberías ver la versión de Angular CLI y las dependencias del proyecto.

#### 4. Iniciar el servidor de desarrollo
```bash
ng serve
```

O alternativamente:
```bash
npm start
```

El servidor se iniciará en `http://localhost:4200/` por defecto.

#### 5. Abrir en el navegador
```
http://localhost:4200
```

La aplicación se recargará automáticamente si modificas algún archivo fuente.

### Credenciales de Acceso

#### E-commerce (Clientes)
- **URL Login:** `http://localhost:4200/login`
- **Credenciales:** Cualquier email y nombre (login simulado)
- **Ejemplo:**
  - Email: `cliente@example.com`
  - Nombre: `Juan Pérez`

#### Sistema POS (Empleados)
- **URL Login:** `http://localhost:4200/pos-login`
- **PIN de acceso:** `1234`
- **Nota:** El sistema validará el PIN antes de permitir el acceso

#### Panel de Administración
- **URL Login:** `http://localhost:4200/admin-login`
- **Email:** `admin@naturvida.com`
- **Password:** `admin123`
- **Nota:** Credenciales hardcodeadas en el componente

### Verificación de Funcionamiento

Una vez iniciado el servidor, verifica que puedes acceder a:

**E-commerce:**
- ✅ Inicio: `http://localhost:4200/`
- ✅ Productos: `http://localhost:4200/productos`
- ✅ Carrito: `http://localhost:4200/carrito`

**Sistema POS:**
- ✅ Login: `http://localhost:4200/pos-login`
- ✅ Dashboard: `http://localhost:4200/pos/dashboard` (después del login)
- ✅ Punto de Venta: `http://localhost:4200/pos/venta`

**Panel Admin:**
- ✅ Login: `http://localhost:4200/admin-login`
- ✅ Dashboard: `http://localhost:4200/admin/dashboard` (después del login)
- ✅ Inventario: `http://localhost:4200/admin/inventario`

### Solución de Problemas Comunes

**Puerto ocupado:**
```bash
ng serve --port 4201
```

**Limpiar caché de npm:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Error de compilación:**
```bash
ng build --configuration development
```

**Verificar estado del proyecto:**
```bash
ng lint
ng test
```

## Scripts Disponibles

| Comando | Descripción | Uso |
|---------|-------------|-----|
| `npm start` | Inicia servidor de desarrollo | `npm start` |
| `ng serve` | Inicia servidor de desarrollo | `ng serve` |
| `ng serve --open` | Inicia servidor y abre navegador | `ng serve --open` |
| `ng serve --port 4201` | Cambia puerto del servidor | `ng serve --port 4201` |
| `ng build` | Build de producción | `ng build --configuration production` |
| `ng build --watch` | Build en modo watch | `ng build --watch` |
| `ng test` | Ejecuta tests unitarios | `ng test` |
| `ng lint` | Verifica código con linter | `ng lint` |
| `npm install` | Instala dependencias | `npm install` |

## Paleta de Colores

```css
/* Colores principales */
--primary: #7C9C3A      /* Verde oliva */
--primary-dark: #5A7329 /* Verde oscuro */
--tierra: #C68B59       /* Terracota */
--crema: #FAF8F3        /* Crema */
--light: #E8E4DC        /* Gris claro */
--medium: #6B7280       /* Gris medio */
--dark: #1F2937         /* Gris oscuro */
```

## Rutas de la Aplicación

### E-commerce (con MainLayout - Header + Footer)

| Ruta | Componente | Descripción | URL Completa |
|------|-----------|-------------|--------------|
| `/` | HomeComponent | Página de inicio con hero y categorías | `http://localhost:4200/` |
| `/productos` | ProductListComponent | Listado completo de 8 productos | `http://localhost:4200/productos` |
| `/producto/:id` | ProductDetailComponent | Detalle de producto individual | `http://localhost:4200/producto/1` |
| `/carrito` | CartComponent | Carrito de compras con checkout | `http://localhost:4200/carrito` |
| `/login` | LoginComponent | Inicio de sesión | `http://localhost:4200/login` |
| `/registro` | RegistroComponent | Registro de nuevos usuarios | `http://localhost:4200/registro` |

### Sistema POS (con PosLayout - Sin decoración)

| Ruta | Componente | Descripción | Protección | Credenciales |
|------|-----------|-------------|------------|--------------|
| `/pos-login` | PosLoginComponent | Login con PIN para empleados | Público | PIN: `1234` |
| `/pos/dashboard` | PosDashboardComponent | Dashboard con KPIs, sidebar y reloj | PosGuard | - |
| `/pos/venta` | PosVentaComponent | Interfaz de venta con búsqueda y ticket | PosGuard | - |
| `/pos/ordenes` | PosOrdenesComponent | Gestión de órdenes de mostrador | PosGuard | - |
| `/pos/pedidos-online` | PosPedidosOnlineComponent | Gestión de pedidos desde web/app | PosGuard | - |

### Panel de Administración (con AdminLayout - Sidebar colapsable)

| Ruta | Componente | Descripción | URL Completa | Credenciales |
|------|-----------|-------------|--------------|--------------|
| `/admin-login` | AdminLoginComponent | Login de administradores | `http://localhost:4200/admin-login` | Email: `admin@naturvida.com`<br>Password: `admin123` |
| `/admin/dashboard` | AdminDashboardComponent | Dashboard con KPIs globales | `http://localhost:4200/admin/dashboard` | - |
| `/admin/ordenes` | AdminOrdersComponent | Gestión global de órdenes | `http://localhost:4200/admin/ordenes` | - |
| `/admin/inventario` | AdminInventoryComponent | CRUD de productos con modal | `http://localhost:4200/admin/inventario` | - |
| `/admin/reportes` | AdminReportsComponent | Reportes y gráficas analíticas | `http://localhost:4200/admin/reportes` | - |

### Arquitectura de Layouts

```typescript
// app.routes.ts - Estructura simplificada

// Rutas E-commerce → usan MainLayoutComponent (Header + Footer)
{
  path: '',
  component: MainLayoutComponent,
  children: [
    { path: '', component: HomeComponent },
    { path: 'productos', component: ProductListComponent },
    // ...
  ]
}

// Login POS → Sin layout (standalone)
{ path: 'pos-login', component: PosLoginComponent }

// Rutas POS → usan PosLayoutComponent (sin decoración)
{
  path: 'pos',
  component: PosLayoutComponent,
  canActivate: [PosGuard],
  children: [
    { path: 'dashboard', component: PosDashboardComponent },
    { path: 'venta', component: PosVentaComponent },
    { path: 'ordenes', component: PosOrdenesComponent },
    { path: 'pedidos-online', component: PosPedidosOnlineComponent }
  ]
}

// Login Admin → Sin layout (standalone)
{ path: 'admin-login', component: AdminLoginComponent }

// Rutas Admin → usan AdminLayoutComponent (sidebar colapsable)
{
  path: 'admin',
  component: AdminLayoutComponent,
  children: [
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'ordenes', component: AdminOrdersComponent },
    { path: 'inventario', component: AdminInventoryComponent },
    { path: 'reportes', component: AdminReportsComponent }
  ]
}
```

## Almacenamiento Local

### E-commerce
- **naturvida_cart**: Items del carrito de compras
- **naturvida_user**: Sesión del usuario cliente
- **naturvida_orders**: Historial de órdenes de e-commerce

### Sistema POS
- **naturvida_pos_empleado**: Sesión del empleado en POS
- **naturvida_pos_caja**: Estado actual de la caja (abierta/cerrada, montos)
- **naturvida_pos_ventas_hoy**: Registro de ventas del turno actual

### Panel de Administración
- **naturvida_admin_token**: Token de autenticación del administrador

## Servicios Principales

### CartService (E-commerce)
Gestión completa del carrito con Signals reactivos:
- `addToCart(producto, cantidad)` - Agrega o incrementa cantidad
- `removeFromCart(id)` - Elimina producto del carrito
- `updateQuantity(id, cantidad)` - Actualiza cantidad específica
- `clearCart()` - Vacía el carrito completamente
- `getItems()` - Retorna items como signal readonly
- `count()` - Signal computed del total de items
- `subtotal()` - Signal computed del precio total
- Auto-persistencia en localStorage con `effect()`

### PosService (Sistema POS)
Gestión del punto de venta con Signals:
- `abrirCaja(montoInicial, cajero)` - Apertura de caja con fondo inicial
- `registrarVenta(venta)` - Registra nueva venta del día
- `cerrarCaja()` - Cierra caja y resetea estado
- `cajaActual()` - Signal del estado de la caja
- `ventasHoy()` - Signal del array de ventas del turno
- `totalVentasHoy()` - Computed signal del total recaudado
- `numeroVentasHoy()` - Computed signal de cantidad de tickets
- `ticketPromedio()` - Computed signal del ticket promedio
- Persistencia automática en localStorage

### AuthService
Manejo de autenticación y registro:
- `login(email, nombre)` - Login simplificado
- `register(userData)` - Registro con datos completos (async)
- `logout()` - Cierra sesión y limpia localStorage
- `isLoggedIn()` - Verifica si hay usuario activo
- `currentUser` - Signal de usuario actual
- `getUserFromStorage()` - Recupera sesión persistente

### ProductService
Gestión de productos:
- `getProductos()` - Observable de lista
- `getProductoById(id)` - Observable de producto individual

### OrderService (E-commerce)
Gestión de pedidos:
- `crearOrden(usuario, productos, total)` - Crea orden con número único
- Persistencia en localStorage

## Conceptos de Angular Utilizados

- **Standalone Components** - Sin NgModules, arquitectura moderna
- **Signals API** - Estado reactivo moderno con `signal()`, `computed()`, `effect()`
- **Computed Signals** - Valores derivados reactivos (totales, contadores, KPIs)
- **Effect** - Efectos secundarios reactivos para localStorage
- **WritableSignal** - Signals mutables con `.set()` y `.update()`
- **toSignal** - Conversión de Observables a Signals con rxjs-interop
- **Dependency Injection** - `inject()` function en lugar de constructor
- **Reactive Programming** - RxJS Observables para HTTP
- **Router** - Navegación y rutas dinámicas con parámetros
- **Route Guards** - Functional guards para proteger rutas POS
- **Multiple Layouts** - Arquitectura con tres layouts diferenciados por contexto
- **HttpClient** - Peticiones HTTP para cargar productos.json
- **Async Pipe** - Suscripciones automáticas en templates
- **Reactive Forms** - FormControl para newsletter y búsquedas
- **Two-way Binding** - `[(ngModel)]` para inputs de formulario
- **Event Emitters** - `@Output()` para comunicación hijo-padre
- **Input/Output** - Comunicación entre componentes y modales
- **RouterLink** - Navegación declarativa con Angular Router
- **RouterLinkActive** - Clases CSS dinámicas según ruta activa
- **Lazy Loading** - Carga diferida de componentes con `loadComponent()`
- **OnInit/OnDestroy** - Lifecycle hooks para timers y limpiezas
- **ViewEncapsulation** - Estilos encapsulados por componente

## Responsividad

La aplicación está optimizada para:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## Build para Producción

### Generar Build de Producción

```bash
ng build --configuration production
```

Los archivos compilados se generarán en `dist/natur-vida/browser/`.

### Características del Build de Producción
- Minificación de código
- Tree-shaking para eliminar código no utilizado
- Optimización de imágenes
- Compilación AOT (Ahead-of-Time)
- CSS purgado con TailwindCSS
- Source maps opcionales

### Tamaño Estimado del Bundle
- **Main bundle:** ~200 KB (gzipped)
- **Vendor bundle:** ~150 KB (gzipped)
- **Styles:** ~20 KB (gzipped)

### Desplegar Build

**Servidor local (prueba):**
```bash
npm install -g http-server
cd dist/natur-vida/browser
http-server -p 8080
```

**Netlify/Vercel:**
- Build command: `ng build --configuration production`
- Output directory: `dist/natur-vida/browser`

**Apache/Nginx:**
- Copia contenido de `dist/natur-vida/browser/` al directorio web
- Configura rewrite rules para SPA routing

## Guía de Pruebas

### Flujo de Prueba Recomendado

#### 1. E-commerce (Cliente)

**Objetivo:** Probar el flujo de compra completo desde el catálogo hasta el checkout.

```
Paso 1: Accede al inicio
URL: http://localhost:4200/

Paso 2: Explora el catálogo
URL: http://localhost:4200/productos

Paso 3: Ver detalle de un producto
URL: http://localhost:4200/producto/1
- Haz clic en cualquier producto
- Agrega productos al carrito desde el detalle

Paso 4: Ver carrito
URL: http://localhost:4200/carrito
- Verifica los productos agregados
- Modifica cantidades
- Observa el total actualizado

Paso 5: Login de cliente
URL: http://localhost:4200/login
- Email: cliente@example.com (o cualquiera)
- Nombre: Juan Pérez (o cualquiera)
- Completa la orden

Paso 6: Verificar orden creada
- El sistema genera un número de orden único
- Se limpia el carrito automáticamente
```

#### 2. Sistema POS (Empleado)

**Objetivo:** Probar el flujo completo de punto de venta con apertura de caja y registro de ventas.

```
Paso 1: Login POS
URL: http://localhost:4200/pos-login
Credencial: PIN 1234

Paso 2: Abrir caja
URL: http://localhost:4200/pos/dashboard
- Haz clic en "Abrir Caja"
- Ingresa monto inicial: $500.00
- Ingresa nombre del cajero: María López
- Confirma apertura

Paso 3: Realizar una venta
URL: http://localhost:4200/pos/venta
- Busca productos en el buscador (ej: "lavanda")
- Agrega productos al ticket
- Selecciona método de pago:
  * Efectivo: ingresa monto y calcula cambio
  * Tarjeta: confirma pago
  * Transferencia: confirma pago
- Genera ticket e imprime

Paso 4: Ver órdenes de mostrador
URL: http://localhost:4200/pos/ordenes
- Revisa las ventas realizadas
- Haz clic en "Ver detalle" para ver modal completo
- Observa los estados de las órdenes

Paso 5: Consultar pedidos online
URL: http://localhost:4200/pos/pedidos-online
- Revisa pedidos del e-commerce
- Filtra por estado (Pendiente/Procesando/Completado)

Paso 6: Verificar KPIs actualizados
URL: http://localhost:4200/pos/dashboard
- Observa Total Ventas Hoy actualizado
- Verifica Tickets Emitidos
- Consulta Ticket Promedio
- Revisa Efectivo en Caja
```

#### 3. Panel de Administración

**Objetivo:** Probar todas las funcionalidades administrativas del sistema.

```
Paso 1: Login Admin
URL: http://localhost:4200/admin-login
Credenciales:
- Email: admin@naturvida.com
- Password: admin123

Paso 2: Dashboard administrativo
URL: http://localhost:4200/admin/dashboard
- Revisa métricas globales:
  * Ventas Totales
  * Ticket Promedio
  * Productos Vendidos
  * Órdenes Activas
- Observa reloj en tiempo real
- Revisa actividad reciente

Paso 3: Gestión de órdenes
URL: http://localhost:4200/admin/ordenes
- Visualiza todas las órdenes (POS + E-commerce)
- Filtra por canal:
  * Todas
  * Online (E-commerce)
  * POS (Punto de Venta)
- Observa estados con badges de color
- Haz clic en icono de ojo para ver detalles

Paso 4: Gestión de inventario
URL: http://localhost:4200/admin/inventario
- Busca productos con el filtro en tiempo real
- Observa indicadores de stock:
  * Verde: Stock > 20
  * Amarillo: Stock 6-20
  * Rojo: Stock ≤ 5
- Crear nuevo producto:
  * Haz clic en botón "Nuevo"
  * Completa formulario en modal
  * Sube imagen (simulado)
  * Guarda producto
- Editar producto existente:
  * Hover sobre fila de producto
  * Haz clic en icono de edición
  * Modifica datos en modal
  * Guarda cambios

Paso 5: Reportes analíticos
URL: http://localhost:4200/admin/reportes
- Consulta gráfica de ventas mensuales
- Hover sobre barras para ver tooltips
- Revisa top productos más vendidos
- Observa progreso de ventas por producto
- Analiza comparativas con mes anterior

Paso 6: Probar sidebar colapsable
- Haz clic en botón chevron (esquina superior derecha)
- Observa transición suave del sidebar
- Verifica tooltips en modo colapsado
- Expande nuevamente el sidebar
```

### Casos de Prueba Específicos

#### Test de Persistencia (localStorage)
```
1. Agrega productos al carrito en E-commerce
2. Cierra el navegador
3. Abre nuevamente http://localhost:4200/carrito
4. Verifica que los productos persisten

5. Haz login en POS y abre caja
6. Recarga la página
7. Verifica que el estado de caja persiste
```

#### Test de Navegación entre Módulos
```
1. Inicia en E-commerce: http://localhost:4200/
2. Cambia manualmente a POS: http://localhost:4200/pos-login
3. Login con PIN 1234
4. Cambia a Admin: http://localhost:4200/admin-login
5. Login con admin@naturvida.com / admin123
6. Regresa a E-commerce: http://localhost:4200/
7. Verifica que cada módulo mantiene su estado independiente
```

#### Test Responsivo
```
1. Abre DevTools (F12)
2. Activa modo dispositivo móvil (Ctrl+Shift+M)
3. Prueba diferentes resoluciones:
   - Mobile: 375px (iPhone SE)
   - Tablet: 768px (iPad)
   - Desktop: 1920px
4. Verifica que:
   - E-commerce: Header colapsable, grid adaptable
   - POS: Sidebar oculto en móvil
   - Admin: Sidebar colapsable funcional
```

### Checklist de Funcionalidades

**E-commerce**
- [ ] Visualización de productos
- [ ] Agregar al carrito
- [ ] Modificar cantidades
- [ ] Eliminar del carrito
- [ ] Login de cliente
- [ ] Registro de cliente
- [ ] Crear orden
- [ ] Persistencia de carrito

**Sistema POS**
- [ ] Login con PIN 1234
- [ ] Apertura de caja
- [ ] Búsqueda de productos
- [ ] Agregar productos al ticket
- [ ] Múltiples métodos de pago
- [ ] Cálculo de cambio (efectivo)
- [ ] Generación de ticket
- [ ] Visualización de órdenes
- [ ] KPIs en tiempo real
- [ ] Sidebar colapsable

**Panel Admin**
- [ ] Login con credenciales
- [ ] Dashboard con métricas
- [ ] Vista de órdenes global
- [ ] Filtros por canal
- [ ] Búsqueda de productos
- [ ] Crear producto
- [ ] Editar producto
- [ ] Indicadores de stock
- [ ] Gráficas de ventas
- [ ] Top productos
- [ ] Sidebar colapsable
- [ ] Logout funcional

## Contribuciones

Este es un proyecto educativo. Para contribuir:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## Estructura de Datos (localStorage)

### Esquema de Almacenamiento Local

**E-commerce**
```javascript
// naturvida_cart
[
  {
    "producto": { "id": "1", "nombre": "Aceite de Lavanda", "precio": 250 },
    "cantidad": 2
  }
]

// naturvida_user
{
  "email": "cliente@example.com",
  "nombre": "Juan Pérez"
}

// naturvida_orders
[
  {
    "numero": "#ORD-1234",
    "usuario": {...},
    "items": [...],
    "total": 500,
    "fecha": "2025-12-01T10:30:00"
  }
]
```

**Sistema POS**
```javascript
// naturvida_pos_empleado
{
  "nombre": "Cajero 1",
  "pin": "1234",
  "timestamp": 1234567890
}

// naturvida_pos_caja
{
  "abierta": true,
  "montoInicial": 500,
  "cajero": "María López",
  "fechaApertura": "2025-12-01T08:00:00"
}

// naturvida_pos_ventas_hoy
[
  {
    "id": "VTA-001",
    "productos": [...],
    "total": 320.50,
    "metodoPago": "efectivo",
    "fecha": "2025-12-01T09:15:00"
  }
]
```

**Panel Admin**
```javascript
// naturvida_admin_token
{
  "email": "admin@naturvida.com",
  "token": "admin-session-token",
  "timestamp": 1234567890
}
```

## Troubleshooting

### Problemas Comunes y Soluciones

**Error: Puerto 4200 ocupado**
```bash
# Solución 1: Usar otro puerto
ng serve --port 4201

# Solución 2: Matar proceso en puerto 4200 (Windows)
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

**Error: Module not found**
```bash
# Limpiar e reinstalar
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Error de compilación TypeScript**
```bash
# Verificar versión de TypeScript
npx tsc --version

# Reinstalar TypeScript
npm install typescript@5.9.2 --save-dev
```

**localStorage no persiste**
- Verifica que no estés en modo incógnito
- Revisa configuración de privacidad del navegador
- Limpia cookies y caché: `Ctrl+Shift+Del`

**Estilos de TailwindCSS no aplican**
```bash
# Regenerar configuración
npx tailwindcss init

# Verificar que styles.css tiene las directivas
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Guard PosGuard no funciona**
- Verifica que hayas hecho login en `/pos-login`
- Revisa que el PIN sea `1234`
- Limpia localStorage: `localStorage.clear()`

## Próximas Mejoras

### Funcionalidades Planificadas
- [ ] AdminGuard para proteger rutas del panel de administración
- [ ] Implementación de backend real con API REST
- [ ] Base de datos PostgreSQL/MongoDB
- [ ] Autenticación JWT para seguridad real
- [ ] Integración con pasarela de pago (Stripe/PayPal)
- [ ] Sistema de notificaciones en tiempo real
- [ ] Exportación de reportes a PDF/Excel
- [ ] Gestión de usuarios y roles avanzada
- [ ] Historial de cambios en inventario
- [ ] Sistema de cupones y descuentos
- [ ] Integración con proveedores de envío

### Mejoras Técnicas
- [ ] Tests unitarios completos (Vitest)
- [ ] Tests E2E (Playwright)
- [ ] CI/CD con GitHub Actions
- [ ] PWA con Service Workers
- [ ] Optimización de rendimiento
- [ ] Internacionalización (i18n)
- [ ] Modo oscuro
- [ ] Accesibilidad (WCAG 2.1)

## Recursos Adicionales

### Documentación
- [Angular 21 Docs](https://angular.dev/)
- [Signals API Guide](https://angular.dev/guide/signals)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [RxJS Documentation](https://rxjs.dev/)

### Tutoriales Relacionados
- [Angular Standalone Components](https://angular.dev/guide/components)
- [Angular Router Guards](https://angular.dev/guide/routing)
- [TailwindCSS with Angular](https://tailwindcss.com/docs/guides/angular)

## Soporte

Para reportar bugs o solicitar nuevas funcionalidades:
1. Abre un issue en el repositorio
2. Describe el problema o sugerencia detalladamente
3. Incluye capturas de pantalla si es posible
4. Especifica navegador y versión

## Autor

Desarrollado para la comunidad de Angular

---

**NaturVida** - *Conectando con la naturaleza, un producto a la vez*
