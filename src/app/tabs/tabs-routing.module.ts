import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'quirofanos',
        loadChildren: () => import('../pages/quirofanos/quirofanos.module').then(m => m.QuirofanosPageModule)
      },
      {
        path: 'equipos',
        loadChildren: () => import('../pages/equipos/equipos.module').then(m => m.EquiposPageModule)
      },
      {
        path: '',
        redirectTo: 'quirofanos',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
