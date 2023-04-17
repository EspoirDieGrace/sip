import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent, SessionLayoutComponent } from './containers';
import { AuthorizeGuard } from "./shared/guards/authorize.guard";




const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'session/login' },
  { 
    path: 'page', 
    component: DefaultLayoutComponent,
    //canActivate:[AuthorizeGuard],
    children:[
      { path: 'dashboard', data:{breadcrumb : 'Dashboard',}, loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },  
      { path: 'parametres',data:{breadcrumb : 'Parametres',}, loadChildren: () => import('./pages/parametres/parametres.module').then(m => m.ParametresModule) },
      { path: 'catalogue', data:{breadcrumb : 'Catalogue',}, loadChildren: () => import('./pages/catalogue/catalogue.module').then(m => m.CatalogueModule) },
      { path: 'gestion', data:{breadcrumb : 'Administration',}, loadChildren: () => import('./pages/gestion/gestion.module').then(m => m.GestionModule) },
      { path: 'client', data:{breadcrumb : 'Client',}, loadChildren: () => import('./pages/client/client.module').then(m => m.ClientModule) },
      { path: 'map', data:{breadcrumb : 'Map',}, loadChildren: () => import('./pages/map/map.module').then(m => m.MapModule) },
    ],
  },
  { 
    path: 'session',
    component:SessionLayoutComponent,
    children:[
      { path:"",  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)}
    ]
  },  
  {
    path:"**",
    redirectTo: 'session/login' 
  }
  
];





@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
