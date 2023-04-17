import { DelegueModalComponent } from './delegue/delegue-modal/delegue-modal.component';
import { DelegueComponent } from './delegue/delegue.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//COMPONENT
import { GestionRoutingModule } from './gestion-routing.module';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { AministrateurModalComponent } from './administrateur/aministrateur-modal/aministrateur-modal.component';

//NG-ANT
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
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

// ANGULAR
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// LEAFLET
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ManagerComponent } from './manager/manager.component';
import { ManagerModalComponent } from './manager/manager-modal/manager-modal.component';

@NgModule({
  declarations: [
    AdministrateurComponent,
    AministrateurModalComponent,
    ManagerComponent,
    ManagerModalComponent,
    DelegueComponent,
    DelegueModalComponent
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
    NzDatePickerModule,
    NzTimePickerModule,
    NzSpinModule,

    LeafletModule,

    FormsModule,
    ReactiveFormsModule,
    GestionRoutingModule,
  ],
  entryComponents: [
    AministrateurModalComponent,
    ManagerModalComponent,
    DelegueModalComponent
  ],
})
export class GestionModule {}
