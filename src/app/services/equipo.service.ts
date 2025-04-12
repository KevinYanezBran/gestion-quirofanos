import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Equipo {
  id?: string;
  nombre: string;
  estado: 'operativo' | 'mantenimiento';
  quirofanoId?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  private baseUrl = 'https://us-central1-app-quirofanos-central.cloudfunctions.net';

  constructor(private http: HttpClient) {}

  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(`${this.baseUrl}/getEquipos`);
  }

  agregarEquipo(data: { nombre: string; estado: string; quirofanoId?: string | null }): Observable<any> {
    return this.http.post(`${this.baseUrl}/addEquipo`, data);
  }

  actualizarEquipo(id: string, data: Partial<Equipo>): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateEquipo`, { id, ...data });
  }

  eliminarEquipo(id: string): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}/deleteEquipo`, {
      body: { id }
    });
  }
}
