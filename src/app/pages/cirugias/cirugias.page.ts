import { Component, OnInit } from '@angular/core';
import { CirugiaService, Cirugia } from 'src/app/services/cirugia.service';
import { QuirofanoService, Quirofano } from 'src/app/services/quirofano.service';
import { EquipoService, Equipo } from 'src/app/services/equipo.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cirugias',
  templateUrl: './cirugias.page.html',
  styleUrls: ['./cirugias.page.scss'],
  standalone: false
})
export class CirugiasPage implements OnInit {
  cirugias: Cirugia[] = [];
  quirofanos: Quirofano[] = [];
  equipos: Equipo[] = [];
  nuevo: Partial<Cirugia> = {
    paciente: '',
    fecha: '',
    hora: '',
    estado: 'programada',
    quirofanoId: '',
    equiposAsignados: []
  };

  constructor(
    private cirugiaService: CirugiaService,
    private quirofanoService: QuirofanoService,
    private equipoService: EquipoService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.obtenerCirugias();
    this.obtenerQuirofanos();
    this.obtenerEquipos();
  }

  obtenerCirugias() {
    this.cirugiaService.getCirugias().subscribe(data => {
      this.cirugias = data;
    });
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

  agregarCirugia() {
    if (!this.nuevo.paciente || !this.nuevo.fecha || !this.nuevo.hora || !this.nuevo.quirofanoId) return;

    this.cirugiaService.agregarCirugia(this.nuevo as Cirugia).subscribe(() => {
      this.showToast('Cirugía registrada', 'success');
      this.nuevo = {
        paciente: '',
        fecha: '',
        hora: '',
        estado: 'programada',
        quirofanoId: '',
        equiposAsignados: []
      };
      this.obtenerCirugias();
    });
  }

  eliminarCirugia(id: string) {
    this.cirugiaService.eliminarCirugia(id).subscribe(() => {
      this.showToast('Cirugía eliminada', 'danger');
      this.obtenerCirugias();
    });
  }

  async editarCirugia(cirugia: Cirugia) {
    const alert = await this.alertController.create({
      header: 'Editar cirugía',
      inputs: [
        {
          name: 'paciente',
          type: 'text',
          value: cirugia.paciente,
          placeholder: 'Nombre del paciente'
        },
        {
          name: 'fecha',
          type: 'date',
          value: cirugia.fecha
        },
        {
          name: 'hora',
          type: 'time',
          value: cirugia.hora
        },
        {
          name: 'estado',
          type: 'text',
          value: cirugia.estado,
          placeholder: 'Estado'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: data => {
            this.cirugiaService.actualizarCirugia(cirugia.id!, {
              paciente: data.paciente,
              fecha: data.fecha,
              hora: data.hora,
              estado: data.estado
            }).subscribe(() => {
              this.showToast('Cirugía actualizada', 'success');
              this.obtenerCirugias();
            });
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  getNombresEquipos(ids: string[]): string[] {
    return this.equipos
      .filter(e => ids.includes(e.id!))
      .map(e => e.nombre);
  }

  getNombreQuirofano(id: string): string {
    const q = this.quirofanos.find(x => x.id === id);
    return q ? q.nombre : 'Desconocido';
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

