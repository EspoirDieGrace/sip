import { RoleModalComponent } from './role/role-modal/role-modal.component';
import { RoleComponent } from './role/role.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//COMPONENTS
import { ParametresRoutingModule } from './parametres-routing.module';

//NG-ANT
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

//ANGULAR
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfilCompteModalComponent } from './user-profil/profil-compte-modal/profil-compte-modal.component';

// PRIMENG
import { TreeTableModule } from 'primeng/treetable';
import { TypeprescripteurComponent } from './typeprescripteur/typeprescripteur.component';
import { TypeprescripteurModalComponent } from './typeprescripteur/typeprescripteur-modal/typeprescripteur-modal.component';
import { CatetablissementComponent } from './catetablissement/catetablissement.component';
import { CatetablissementModalComponent } from './catetablissement/catetablissement-modal/catetablissement-modal.component';

@NgModule({
  declarations: [
    RoleComponent,
    RoleModalComponent,
    TypeprescripteurComponent,
    TypeprescripteurModalComponent,
    CatetablissementComponent,
    CatetablissementModalComponent
  ],
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
    NzTreeModule,
    NzDescriptionsModule,
    NzTabsModule,
    NzStatisticModule,

    TreeTableModule,

    FormsModule,
    ReactiveFormsModule,
    ParametresRoutingModule,
  ],
  entryComponents: [
    RoleModalComponent,
    TypeprescripteurModalComponent,
    CatetablissementModalComponent
  ],
})
export class ParametresModule {}
