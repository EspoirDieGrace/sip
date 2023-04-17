import { ZoneComponent } from './zone/zone.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {MapComponent } from "./map.component";
const routes: Routes = [
  { path: '', component: MapComponent},
  { path:'zone', data: { breadcrumb: 'Zone'} , component:ZoneComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule{}