import { TypeprescripteurModalComponent } from './typeprescripteur-modal/typeprescripteur-modal.component';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ConfigService } from 'ngx-envconfig';
import { Subscription } from 'rxjs';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { Typeprescripteur } from 'src/app/shared/model/typeprescripteur.model';
import { TypeprescripteurService } from 'src/app/shared/services/typeprescripteur.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';

@Component({
  selector: 'app-typeprescripteur',
  templateUrl: './typeprescripteur.component.html',
  styleUrls: ['./typeprescripteur.component.scss']
})
export class TypeprescripteurComponent implements OnInit {
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
    private typeprescripteurService:TypeprescripteurService
  ) { }

  ngOnInit(): void {
    this.getType()
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
      titre = 'Ajouter un type';
      callback = (d, obj) => this.add(d, obj);
    } else if (mod === 'update') {
      msgBtn = 'Modifier';
      titre = 'Modifier un type';
      callback = (d, obj) => this.update(d, obj);
    }
    const modal = this.modal.create({
      nzTitle: titre,
      nzWidth: 550,
      nzContent: TypeprescripteurModalComponent,
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

  getType(obj?:any) {
    this.dataSet = []
    
    this.tableSetting.loading = true
    this.typeprescripteurService.getAll().subscribe(
      data => this.utilisService.response(data,(d) => {
        console.log(d);
        this.dataSet = d ;
        this.tableSetting.loading = false
      }),
      error => this.utilisService.response(error),
    )
  }


  add(typeprescripteur:Typeprescripteur, obj?){
    this.list_subsc.add(
      this.typeprescripteurService.add(typeprescripteur, obj).subscribe(
        (data)=>this.utilisService.response(data,(d)=>{
          this.utilisService.createNotification(
            'success',
              'Ajout reussi',
              "Le type à été ajouté avec succès"
          );
          this.getType();
        }),
        (error)=>{
          this.utilisService.response(error)
        }
      )
    )
  }


  update(typeprescripteur:Typeprescripteur, obj?){
    this.list_subsc.add(
      this.typeprescripteurService.update(typeprescripteur, obj).subscribe(
        (data)=>this.utilisService.response(data,(d)=>{
          this.utilisService.createNotification(
            'success',
              'Ajout reussi',
              "Le type à été ajouté avec succès"
          );
          this.getType();
        }),
        (error)=>{
          this.utilisService.response(error)
        }
      )
    )
  }

  delete(row: Typeprescripteur[]) {
    let id = row.map((v) => v.typeprescripteurid);
    this.list_subsc.add(
      this.typeprescripteurService.delete(id).subscribe((data) =>
        this.utilisService.response(data, (d) => {
          this.utilisService.createNotification(
            'success',
            'Suppression reussie',
            'Le utilisateur à été supprimé avec succes'
          );
          this.getType();
        })
      )
    );
  }

}
