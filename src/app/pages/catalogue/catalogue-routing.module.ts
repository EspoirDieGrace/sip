import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogueComponent } from './catalogue.component';
import { ServiceComponent } from './service/service.component';
import { ProduitComponent } from './produit/produit.component';

const routes: Routes = [
  { path: '', component: CatalogueComponent },
  { path: 'service' , data:{breadcrumb : 'Service',} , component: ServiceComponent},
  { path: 'produit' , data:{breadcrumb : 'Produit',} , component: ProduitComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
