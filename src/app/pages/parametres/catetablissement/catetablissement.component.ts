import { CatetablissementModalComponent } from './catetablissement-modal/catetablissement-modal.component';
import { CatetablissementService } from './../../../shared/services/catetablissement.service';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ConfigService } from 'ngx-envconfig';
import { Subscription } from 'rxjs';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { Categorieetablissement } from 'src/app/shared/model/catetablissement.model';

@Component({
  selector: 'app-catetablissement',
  templateUrl: './catetablissement.component.html',
  styleUrls: ['./catetablissement.component.scss']
})
export class CatetablissementComponent implements OnInit {
  list_subsc: Subscription = new Subscription();

  dataSet: any;
  tableSetting: TableSetting = {
    checkbox: false,
    loading: false,
  };
  obj:any = {}
  constructor(
    private modal: NzModalService,
    private utilisService: UtilisService,
    private configService: ConfigService,
    private catetabService:CatetablissementService) { }

  ngOnInit(): void {
    this.getCatetab()
  }

  ngOnDestroy(): void {
    this.list_subsc.unsubscribe();
  }


  openModal(mod, data?): void {
    let titre = '';
    let msgBtn = '';
    let callback: any;
    if (mod === 'add') {
      msgBtn = 'Ajouter';
      titre = 'Ajouter une catégorie';
      callback = (d, obj) => this.add(d, obj);
    } else if (mod === 'update') {
      msgBtn = 'Modifier';
      titre = 'Modifier une catégorie';
      callback = (d, obj) => this.update(d, obj);
    }
    const modal = this.modal.create({
      nzTitle: titre,
      nzWidth: 550,
      nzContent: CatetablissementModalComponent,
    });
    const instance = modal.getContentComponent();
    instance.data = data;
    instance.msgBtn = msgBtn;

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe((result) => {
      if (result && result.data) {
        let res = result.data;
        console.log(res);
       
        callback(res);
      }
    });
  }

  getCatetab(obj?:any) {
    this.dataSet = []
    
    this.tableSetting.loading = true
    this.catetabService.getAll().subscribe(
      data => this.utilisService.response(data,(d) => {
        console.log(d);
        this.dataSet = d ;
        this.tableSetting.loading = false
      }),
      error => this.utilisService.response(error),
    )
  }



  add(categorieetablissement:Categorieetablissement, obj?){
    this.list_subsc.add(
      this.catetabService.add(categorieetablissement, obj).subscribe(
        (data)=>this.utilisService.response(data,(d)=>{
          this.utilisService.createNotification(
            'success',
              'Ajout reussi',
              "Le type à été ajouté avec succès"
          );
          this.getCatetab();
        }),
        (error)=>{
          this.utilisService.response(error)
        }
      )
    )
  }


  update(categorieetablissement:Categorieetablissement, obj?){
    this.list_subsc.add(
      this.catetabService.update(categorieetablissement, obj).subscribe(
        (data)=>this.utilisService.response(data,(d)=>{
          this.utilisService.createNotification(
            'success',
              'Ajout reussi',
              "Le type à été ajouté avec succès"
          );
          this.getCatetab();
        }),
        (error)=>{
          this.utilisService.response(error)
        }
      )
    )
  }

  delete(row: Categorieetablissement[]) {
    let id = row.map((v) => v.catetabid);
    this.list_subsc.add(
      this.catetabService.delete(id).subscribe((data) =>
        this.utilisService.response(data, (d) => {
          this.utilisService.createNotification(
            'success',
            'Suppression reussie',
            'Le utilisateur à été supprimé avec succes'
          );
          this.getCatetab();
        })
      )
    );
  }
}
