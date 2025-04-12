import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CirugiasPage } from './cirugias.page';

const routes: Routes = [
  {
    path: '',
    component: CirugiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CirugiasPageRoutingModule {}
