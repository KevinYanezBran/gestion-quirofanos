import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Quirofano {
  id?: string;
  nombre: string;
  estado: 'disponible' | 'ocupado' | 'mantenimiento';
  equiposAsignados?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class QuirofanoService {
  // 🔧 Cambiada la URL base al nuevo proyecto funcional
  private baseUrl = 'https://us-central1-app-quirofanos-central.cloudfunctions.net';

  constructor(private http: HttpClient) {}

  getQuirofanos(): Observable<Quirofano[]> {
    return this.http.get<Quirofano[]>(`${this.baseUrl}/getQuirofanos`);
  }

  agregarQuirofano(data: { nombre: string; estado: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/addQuirofano`, data);
  }

  actualizarQuirofano(id: string, data: Partial<Quirofano>): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateQuirofano`, { id, ...data });
  }

  eliminarQuirofano(id: string): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}/deleteQuirofano`, {
      body: { id }
    });
  }
}
