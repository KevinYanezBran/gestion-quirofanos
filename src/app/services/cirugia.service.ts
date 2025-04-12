import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cirugia {
  id?: string;
  paciente: string;
  fecha: string;
  hora: string;
  estado: 'programada' | 'en curso' | 'finalizada' | 'cancelada';
  quirofanoId: string;
  equiposAsignados: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CirugiaService {
  private baseUrl = 'https://us-central1-app-quirofanos-central.cloudfunctions.net';

  constructor(private http: HttpClient) {}

  getCirugias(): Observable<Cirugia[]> {
    return this.http.get<Cirugia[]>(`${this.baseUrl}/getCirugias`);
  }

  agregarCirugia(data: Omit<Cirugia, 'id'>): Observable<any> {
    return this.http.post(`${this.baseUrl}/addCirugia`, data);
  }

  actualizarCirugia(id: string, data: Partial<Cirugia>): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateCirugia`, { id, ...data });
  }

  eliminarCirugia(id: string): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}/deleteCirugia`, {
      body: { id }
    });
  }
}
