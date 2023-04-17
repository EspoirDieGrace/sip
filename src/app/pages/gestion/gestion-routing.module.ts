import { DelegueComponent } from './delegue/delegue.component';
import { ManagerComponent } from './manager/manager.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrateurComponent } from './administrateur/administrateur.component';

const routes: Routes = [
  { path: '', redirectTo: 'administrateur' },
  
  {path: 'administrateur',data: { breadcrumb: 'Administrateur' },component: AdministrateurComponent},
   {path: 'manager',data: { breadcrumb: 'Manager' },component: ManagerComponent},
   {path: 'delegue',data: { breadcrumb: 'Délégué' },component: DelegueComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionRoutingModule {}
