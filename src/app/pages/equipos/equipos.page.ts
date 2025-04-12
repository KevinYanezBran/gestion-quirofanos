import { Component, OnInit } from '@angular/core';
import { EquipoService, Equipo } from 'src/app/services/equipo.service';
import { QuirofanoService, Quirofano } from 'src/app/services/quirofano.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.page.html',
  styleUrls: ['./equipos.page.scss'],
  standalone: false
})
export class EquiposPage implements OnInit {
  equipos: Equipo[] = [];
  quirofanos: Quirofano[] = [];
  nuevoNombre = '';
  nuevoEstado: 'operativo' | 'mantenimiento' = 'operativo';

  constructor(
    private equipoService: EquipoService,
    private quirofanoService: QuirofanoService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.obtenerEquipos();
    this.obtenerQuirofanos();
  }

  obtenerEquipos() {
    this.equipoService.getEquipos().subscribe(data => {
      this.equipos = data;
    });
  }

  obtenerQuirofanos() {
    this.quirofanoService.getQuirofanos().subscribe(data => {
      this.quirofanos = data;
    });
  }

  getNombreQuirofano(id: string | null | undefined): string {
    const q = this.quirofanos.find(x => x.id === id);
    return q ? q.nombre : 'No asignado';
  }  

  agregarEquipo() {
    const data = {
      nombre: this.nuevoNombre,
      estado: this.nuevoEstado
    };

    this.equipoService.agregarEquipo(data).subscribe(() => {
      this.showToast('Equipo agregado', 'success');
      this.nuevoNombre = '';
      this.nuevoEstado = 'operativo';
      this.obtenerEquipos();
    });
  }

  async editarEquipo(equipo: Equipo) {
    const alert = await this.alertController.create({
      header: 'Editar equipo',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: equipo.nombre,
          placeholder: 'Nombre'
        },
        {
          name: 'estado',
          type: 'text',
          value: equipo.estado,
          placeholder: 'operativo / mantenimiento'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            this.equipoService.actualizarEquipo(equipo.id!, {
              nombre: data.nombre,
              estado: data.estado
            }).subscribe(() => {
              this.showToast('Equipo actualizado', 'success');
              this.obtenerEquipos();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarEquipo(id: string) {
    this.equipoService.eliminarEquipo(id).subscribe(() => {
      this.showToast('Equipo eliminado', 'danger');
      this.obtenerEquipos();
    });
  }

  asignarAQuirofano(equipoId: string, quirofanoId: string | null) {
    this.equipoService.actualizarEquipo(equipoId, { quirofanoId }).subscribe(() => {
      this.showToast('Equipo asignado', 'success');
      this.obtenerEquipos();
    });
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    toast.present();
  }
}
