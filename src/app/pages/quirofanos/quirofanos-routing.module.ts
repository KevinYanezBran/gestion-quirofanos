import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuirofanosPage } from './quirofanos.page';

const routes: Routes = [
  {
    path: '',
    component: QuirofanosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuirofanosPageRoutingModule {}
