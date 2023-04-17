import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientComponent } from "./client.component";
import { EtablissementComponent } from "./etablissement/etablissement.component";
import { PrescripteurComponent } from "./prescripteur/prescripteur.component";

const routes: Routes = [
  { path: '', component: ClientComponent },
  {path:'prescripteur', data: { breadcrumb: 'Prescripteur'} , component:PrescripteurComponent},
  {path:'etablissement', data: { breadcrumb:'Etablissement'}, component:EtablissementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule{}