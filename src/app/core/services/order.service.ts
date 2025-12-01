import { Injectable, signal } from '@angular/core';
import { Orden, ProductoCarrito, Usuario } from '../models/natur-vida.models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = signal<Orden[]>([]);

  constructor() {
    const saved = localStorage.getItem('naturvida_orders');
    if (saved) {
      try {
        this.orders.set(JSON.parse(saved));
      } catch (e) {
        console.error('Error cargando órdenes', e);
      }
    }
  }

  crearOrden(usuario: Usuario, productos: ProductoCarrito[], total: number): Orden {
    const fecha = new Date();
    const idUnico = `ORD-${fecha.getFullYear()}${(fecha.getMonth()+1).toString().padStart(2,'0')}${fecha.getDate().toString().padStart(2,'0')}-${Math.floor(Math.random() * 10000)}`;

    const nuevaOrden: Orden = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      numeroOrden: idUnico,
      usuarioId: usuario.id,
      fecha: new Date(),
      productos: [...productos],  
      cantidadTotal: productos.reduce((acc, p) => acc + p.cantidad, 0),
      subtotal: total,
      total: total,
      estado: 'pendiente'
    };

    this.orders.update(current => [nuevaOrden, ...current]);
    localStorage.setItem('naturvida_orders', JSON.stringify(this.orders()));
    
    return nuevaOrden;
  }
}