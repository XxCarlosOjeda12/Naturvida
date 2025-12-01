export interface Producto {
  id: string;
  sku: string;
  nombre: string;
  descripcion: string;
  descripcionCorta: string;
  precio: number;
  precioDescuento?: number;
  imagen: string;
  categoria: string;
  stock: number;
  etiquetas: string[];
  nuevo?: boolean;
  destacado?: boolean;
}

export interface ProductoCarrito extends Producto {
  cantidad: number;
  subtotalItem: number;
}

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  apellidos?: string;
  telefono?: string;
  direccion?: string;
  fechaRegistro: Date;
}

export interface Orden {
  id: string;
  numeroOrden: string;
  usuarioId: string;
  fecha: Date;
  productos: ProductoCarrito[];
  cantidadTotal: number;
  subtotal: number;
  total: number;
  estado: 'pendiente' | 'entregada';
}