import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// COMPONENTS
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './catalogue.component';
import { ServiceComponent } from './service/service.component';
import { ProduitComponent } from './produit/produit.component';
import { ProduitModalComponent } from './produit/produit-modal/produit-modal.component';
import { ServiceModalComponent } from './service/service-modal/service-modal.component';




//NG-ZORRO
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';



//ANGULAR
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CatalogueComponent, ServiceComponent, ProduitComponent, ProduitModalComponent, ServiceModalComponent],
  imports: [
    CommonModule,
    NzDividerModule,
    NzPageHeaderModule,
    NzCardModule,
    NzButtonModule,
    NzTableModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzSpaceModule,
    NzPopconfirmModule,
    NzCheckboxModule,


    FormsModule,
    ReactiveFormsModule,  
    CatalogueRoutingModule
  ],
  entryComponents:[
    ProduitModalComponent, 
    ServiceModalComponent
  ]
})
export class CatalogueModule { }
