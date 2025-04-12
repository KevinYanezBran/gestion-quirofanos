import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: false
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async iniciarSesion() {
    try {
      await this.authService.login(this.email, this.password);
      this.showToast('Inicio de sesión exitoso', 'success');
      this.router.navigate(['/home']);
    } catch (error) {
      this.showToast('Error al iniciar sesión: ' + (error as any).message, 'danger');
    }
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      color,
      position: 'bottom',
    });
    toast.present();
  }
}
