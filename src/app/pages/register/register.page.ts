import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { updateProfile } from 'firebase/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: false
})
export class RegisterPage {
  email = '';
  password = '';
  nombre = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async registrar() {
    try {
      const userCredential = await this.authService.register(this.email, this.password);
      
      // Guardar nombre en el perfil
      await updateProfile(userCredential.user, {
        displayName: this.nombre
      });

      this.showToast('Registro exitoso', 'success');
      this.router.navigate(['/home']);
    } catch (error) {
      this.showToast('Error al registrar: ' + (error as any).message, 'danger');
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
