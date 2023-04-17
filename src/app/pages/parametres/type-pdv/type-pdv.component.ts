import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TypePdvModalComponent } from './type-pdv-modal/type-pdv-modal.component';
import { Subscription } from 'rxjs';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { ConfigService } from 'ngx-envconfig';
import { TypepdvService } from 'src/app/shared/services/Typepdv.service';
import { Typepdv } from 'src/app/shared/model/Typepdv.model';


@Component({
  selector: 'app-type-pdv',
  templateUrl: './type-pdv.component.html',
  styleUrls: ['./type-pdv.component.scss']
})
export class TypePdvComponent implements OnInit {

  list_subsc:Subscription = new Subscription();

  dataSet:any;
  tableSetting: TableSetting = {
    checkbox:false,
    loading: false
  };


  constructor(
    private modal: NzModalService,
    private utilisService : UtilisService,
    private configService: ConfigService,
    private typepdvService: TypepdvService
  ) { }

  ngOnInit(): void {
    this.getTypepdvs()
  }



  ngOnDestroy(): void {
    this.list_subsc.unsubscribe()
  }





  openModal(mod, data?): void {
    let titre = "";
    let msgBtn = "";
    let callback:any;
    if (mod === "add") {
      msgBtn = 'Ajouter';
      titre = "Ajouter un type de pdv";
      callback =  (d) =>  this.add(d);
    } else if (mod === "update"){
      msgBtn = 'Modifier';
      titre = "Modifier un type de pdv";
      callback = (d) => this.update(d) ;
    }
    const modal = this.modal.create({
      nzTitle: titre,
      nzContent: TypePdvModalComponent,
    });
    const instance = modal.getContentComponent();
    instance.data = data 
    instance.msgBtn = msgBtn
    
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      if(result) callback(result)
    });

   
  }


  ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// FONCTIONS CRUD




  add(ville:Typepdv){
    this.list_subsc.add(this.typepdvService.add(ville).subscribe(
      (data) => this.utilisService.response(data, (d) => {
        this.utilisService.createNotification(
          'success',
          'Ajout reussi',
          "Le type de pdv à été ajouté avec succes"
          )
        this.getTypepdvs()
      }),
      (error) => {
        this.utilisService.response(error);;
        
      }
    ))
  }



  update(ville:Typepdv){
    this.list_subsc.add(this.typepdvService.update(ville).subscribe(
      (data) => this.utilisService.response(data, (d) => {
        this.utilisService.createNotification(
          'success',
          'Modification reussie',
          "Le type de pdv à été modifié avec succes"
          )
       
        this.getTypepdvs()
      }),
      (error) => {
        this.utilisService.response(error);;
        
      }
    ))
  }



  getTypepdvs(){
    this.tableSetting.loading = true
    this.typepdvService.getAll().subscribe(
      data => this.utilisService.response(data,(d) => {
        console.log(d);
        this.dataSet = d ;
        this.tableSetting.loading = false
      }),
      error => this.utilisService.response(error),
    )
  }



  delete(row:Typepdv[]){
    let listeid = row.map(v => v.typepdvid)
    this.list_subsc.add(this.typepdvService.delete(listeid).subscribe(
      data => this.utilisService.response(data,(d) => {
        this.utilisService.createNotification(
          'success',
          'Suppression reussie',
          "Le type de pdv à été supprimé avec succes"
          )
        this.getTypepdvs()
      })))
    
  }



}

