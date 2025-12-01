export interface ProductoVenta {
  id: string;
  sku: string;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
  imagen?: string;
  stock?: number;
}

export interface Venta {
  id: string;
  fecha: string;  
  cliente: string;
  productos: ProductoVenta[];
  subtotal: number;
  iva: number;
  total: number;
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia';
  montoRecibido?: number;
  cambio?: number;
  cajero: string;
  estado: 'completada' | 'cancelada' | 'pendiente';
}

export interface CajaEstado {
  abierta: boolean;
  montoInicial: number;
  montoActual: number;
  fechaApertura: string | null;
  cajero: string | null;
}

export interface Orden {
  id?: string;
  numeroOrden: string;
  cliente: string;
  fecha?: string;
  hora: string;
  productos: ProductoVenta[];
  subtotal?: number;
  iva?: number;
  total: number;
  metodoPago?: string;
  numeroTicket?: string;
  tipoEntrega?: 'envio' | 'recoger';  
  estado: 'pendiente' | 'preparando' | 'lista' | 'entregada';
}