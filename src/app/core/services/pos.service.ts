import { Injectable, signal, computed, effect } from '@angular/core';
import { Venta, CajaEstado, Orden } from '../models/pos.models';

@Injectable({
  providedIn: 'root'
})
export class PosService {
  ventasHoy = signal<Venta[]>([]);
  cajaActual = signal<CajaEstado>({
    abierta: false,
    montoInicial: 0,
    montoActual: 0,
    fechaApertura: null,
    cajero: null
  });

  totalVentasHoy = computed(() => this.ventasHoy().reduce((sum, v) => sum + v.total, 0));
  numeroVentasHoy = computed(() => this.ventasHoy().length);
  ticketPromedio = computed(() => {
    return this.numeroVentasHoy() === 0 ? 0 : this.totalVentasHoy() / this.numeroVentasHoy();
  });

  constructor() {
    this.cargarDatosStorage();
  }

  private cargarDatosStorage() {
    const caja = localStorage.getItem('naturvida_pos_caja');
    if (caja) this.cajaActual.set(JSON.parse(caja));

    const ventas = localStorage.getItem('naturvida_pos_ventas_hoy');
    if (ventas) this.ventasHoy.set(JSON.parse(ventas));
  }

  abrirCaja(montoInicial: number, cajero: string) {
    const nuevaCaja: CajaEstado = {
      abierta: true,
      montoInicial,
      montoActual: montoInicial,
      fechaApertura: new Date().toISOString(),
      cajero
    };
    this.cajaActual.set(nuevaCaja);
    localStorage.setItem('naturvida_pos_caja', JSON.stringify(nuevaCaja));
  }

  registrarVenta(venta: Venta) {
    this.ventasHoy.update(ventas => [...ventas, venta]);
    localStorage.setItem('naturvida_pos_ventas_hoy', JSON.stringify(this.ventasHoy()));

    if (venta.metodoPago === 'efectivo') {
      this.cajaActual.update(caja => ({
        ...caja,
        montoActual: caja.montoActual + venta.total
      }));
      localStorage.setItem('naturvida_pos_caja', JSON.stringify(this.cajaActual()));
    }
  }

  cerrarCaja() {
     // Aca te avientas el back
    localStorage.removeItem('naturvida_pos_caja');
    localStorage.removeItem('naturvida_pos_ventas_hoy');
    
    this.cajaActual.set({
      abierta: false,
      montoInicial: 0,
      montoActual: 0,
      fechaApertura: null,
      cajero: null
    });
    this.ventasHoy.set([]);
  }
}