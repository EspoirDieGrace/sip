import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


//NG ZORRO
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';




@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NzStatisticModule,
    NzGridModule,
    NzPageHeaderModule,
    NzCardModule,
    NzListModule,
    NzCommentModule,
    NzAvatarModule,

    DashboardRoutingModule
  ]
})
export class DashboardModule { }
