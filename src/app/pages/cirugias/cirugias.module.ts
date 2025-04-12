import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CirugiasPageRoutingModule } from './cirugias-routing.module';

import { CirugiasPage } from './cirugias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CirugiasPageRoutingModule
  ],
  declarations: [CirugiasPage]
})
export class CirugiasPageModule {}
