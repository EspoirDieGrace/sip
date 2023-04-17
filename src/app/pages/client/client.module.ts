import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// COMPONENTS




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
import { ClientRoutingModule } from './client-routing.module';
import { PrescripteurComponent } from './prescripteur/prescripteur.component';
import { PrescripteurModalComponent } from './prescripteur/prescripteur-modal/prescripteur-modal.component';
import { EtablissementComponent } from './etablissement/etablissement.component';
import { EtablissementModalComponent } from './etablissement/etablissement-modal/etablissement-modal.component';


@NgModule({
  declarations: [
    PrescripteurComponent, 
    PrescripteurModalComponent,
     EtablissementComponent,
       EtablissementModalComponent],
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
    ClientRoutingModule
  ],
  entryComponents:[
    PrescripteurModalComponent
  ]
})

export class ClientModule{}