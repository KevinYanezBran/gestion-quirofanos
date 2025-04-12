import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  constructor(
    private auth: Auth,
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) {}

  cerrarSesion() {
    this.menuCtrl.close(); // Cierra el menú lateral si está abierto

    signOut(this.auth).then(() => {
      this.navCtrl.navigateRoot('/login');
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
