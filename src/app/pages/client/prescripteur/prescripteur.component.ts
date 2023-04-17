import { Prescripteur } from './../../../shared/model/Prescripteur.model';
import { Subscription } from 'rxjs';
import { PrescripteurService } from './../../../shared/services/Prescripteur.service';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { ConfigService } from 'ngx-envconfig';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { PrescripteurModalComponent } from './prescripteur-modal/prescripteur-modal.component';

@Component({
  selector: 'app-prescripteur',
  templateUrl: './prescripteur.component.html',
  styleUrls: ['./prescripteur.component.scss']
})
export class PrescripteurComponent implements OnInit {
list_subsc:Subscription= new Subscription()
  dataSet:any;
  obj:any = {}
  tableSetting: TableSetting = {
    checkbox: false,
    loading: false,
  };
  constructor(
    private modal: NzModalService,
    private utilisService: UtilisService,

    private configService: ConfigService,
    private prescripteurService:PrescripteurService
  ) { }

  ngOnInit(): void {
    this.getPrescripteur()
  }
  ngOnDestroy(): void {
    this.list_subsc.unsubscribe();
  }
openModal(mod, data?){
  let titre="";
  let msgBtn="";
  let callback:any;
  if(mod==='add'){
    msgBtn='Ajouter';
    titre='Ajouter un prescripteur';
    callback=(d, obj)=>this.add(d, obj)
  }else if(mod=='update'){
    msgBtn='Modifier';
    titre='Modifier un prescripteur';
    callback = (d, obj)=>this.update(d, obj)
  }
  const modal = this.modal.create({
    nzTitle:titre,
    nzWidth:650,
    nzContent:PrescripteurModalComponent
  });
  const instance = modal.getContentComponent();
  instance.data= data;
  instance.msgBtn= msgBtn;
  modal.afterOpen.subscribe(()=>console.log('[afterOpen] emitted!'));
  ////apres fermeture du formulaire
  modal.afterClose.subscribe((result)=>{
    if(result && result.data){
      let res = result.data;
      console.log(res);
      callback(res)
      
    }
  })
}
/////fonction pour l'ajout des prescripteurs 

add(prescripteur:Prescripteur, obj?){
  this.list_subsc.add(
    this.prescripteurService.add(prescripteur).subscribe(
      (data)=>this.utilisService.response(data,(d)=>{
        this.utilisService.createNotification(
          'success',
          'Ajout réussi',
          'Le prescripteur a été ajouté avec succès'
        );
        this.getPrescripteur();
      }),
      (error)=>{
        this.utilisService.response(error)
      }
    )
  )
}

/////fonctions pour la modification d'un prescripteur
update(prescripteur:Prescripteur, obj?){
  this.list_subsc.add(
    this.prescripteurService.update(prescripteur).subscribe(
      (data)=>this.utilisService.response(data, (d)=>{
        this.utilisService.createNotification(
          'success',
          'Modification réussie',
          "Les informations du prescripteur ont été modifiées avec cuccès "
        );
        this.getPrescripteur();
      }),
      (error)=>{
        this.utilisService.response(error)
      }
    )
  )
}

////fonctions pour l'affichage des prescripteurs
getPrescripteur(obj?:any){
  this.dataSet=[];
  this.tableSetting.loading=true
  this.prescripteurService.getAll().subscribe(
    data=>this.utilisService.response(data,(d)=>{
      this.dataSet=d;
      this.tableSetting.loading=false
    }),
    error=>this.utilisService.response(error)
  )
}
}
