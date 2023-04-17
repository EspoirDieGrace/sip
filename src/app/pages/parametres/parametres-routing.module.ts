import { CatetablissementComponent } from './catetablissement/catetablissement.component';
import { CatetablissementService } from './../../shared/services/catetablissement.service';
import { Categorieetablissement } from './../../shared/model/catetablissement.model';
import { TypeprescripteurComponent } from './typeprescripteur/typeprescripteur.component';
import { RoleComponent } from './role/role.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypePdvComponent } from './type-pdv/type-pdv.component';
import { TypeTransactionComponent } from './type-transaction/type-transaction.component';
import { UserProfilComponent } from './user-profil/user-profil.component';

const routes: Routes = [
  { path: 'role', data: { breadcrumb: 'role' },component: RoleComponent},
  { path: 'typeprescripteur', data: { breadcrumb: 'tTypeprescripteur' },component: TypeprescripteurComponent},
  { path: 'categorieetablissement', data: { breadcrumb: 'categorieetablissement' },component: CatetablissementComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametresRoutingModule {}
