import { Component, OnInit } from '@angular/core';
import { QuirofanoService, Quirofano } from 'src/app/services/quirofano.service';
import { EquipoService, Equipo } from 'src/app/services/equipo.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-quirofanos',
  templateUrl: './quirofanos.page.html',
  styleUrls: ['./quirofanos.page.scss'],
  standalone: false
})
export class QuirofanosPage implements OnInit {
  quirofanos: Quirofano[] = [];
  equipos: Equipo[] = [];
  nuevoNombre = '';
  nuevoEstado: 'disponible' | 'ocupado' | 'mantenimiento' = 'disponible';

  constructor(
    private quirofanoService: QuirofanoService,
    private equipoService: EquipoService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.obtenerQuirofanos();
    this.obtenerEquipos();
  }

  obtenerQuirofanos() {
    this.quirofanoService.getQuirofanos().subscribe(data => {
      this.quirofanos = data;
    });
  }

  obtenerEquipos() {
    this.equipoService.getEquipos().subscribe(data => {
      this.equipos = data;
    });
  }

  agregarQuirofano() {
    if (!this.nuevoNombre.trim()) return;

    const data = {
      nombre: this.nuevoNombre,
      estado: this.nuevoEstado,
      equiposAsignados: []
    };

    this.quirofanoService.agregarQuirofano(data).subscribe(() => {
      this.showToast('Quirófano agregado correctamente', 'success');
      this.nuevoNombre = '';
      this.nuevoEstado = 'disponible';
      this.obtenerQuirofanos();
    });
  }

  async editarQuirofano(quirofano: Quirofano) {
    const alert = await this.alertController.create({
      header: 'Editar quirófano',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: quirofano.nombre,
          placeholder: 'Nombre'
        },
        {
          name: 'estado',
          type: 'text',
          value: quirofano.estado,
          placeholder: 'Estado (disponible, ocupado, mantenimiento)'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            this.quirofanoService.actualizarQuirofano(quirofano.id!, {
              nombre: data.nombre,
              estado: data.estado
            }).subscribe(() => {
              this.showToast('Quirófano actualizado', 'success');
              this.obtenerQuirofanos();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarQuirofano(id: string) {
    this.quirofanoService.eliminarQuirofano(id).subscribe(() => {
      this.showToast('Quirófano eliminado', 'danger');
      this.obtenerQuirofanos();
    });
  }

  equiposDelQuirofano(id: string): Equipo[] {
    return this.equipos.filter(e => e.quirofanoId === id);
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
