import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Producto } from '../models/natur-vida.models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private dataUrl = 'assets/data/productos.json';

  getProductos(): Observable<Producto[]> {
    return this.http.get<{ productos: Producto[] }>(this.dataUrl).pipe(
      map(response => response.productos)
    );
  }

  getProductoById(id: string): Observable<Producto | undefined> {
    return this.getProductos().pipe(
      map(productos => productos.find(p => p.id === id))
    );
  }
}