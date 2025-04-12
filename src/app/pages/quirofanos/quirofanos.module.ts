import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuirofanosPageRoutingModule } from './quirofanos-routing.module';

import { QuirofanosPage } from './quirofanos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuirofanosPageRoutingModule
  ],
  declarations: [QuirofanosPage]
})
export class QuirofanosPageModule {}
