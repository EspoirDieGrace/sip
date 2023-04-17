import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProduitModalComponent } from './produit-modal/produit-modal.component';
import { Subscription } from 'rxjs';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { ConfigService } from 'ngx-envconfig';
import { ProduitService } from 'src/app/shared/services/Produit.service';
import { GserviceService } from 'src/app/shared/services/Gservice.service';
import { Produit } from 'src/app/shared/model/Produit.model';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

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
    private produitService: ProduitService,
    private gserviceService: GserviceService

  ) { }

  ngOnInit(): void {
    this.getProduits()
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
      titre = "Ajouter un produit";
      callback =  (d) =>  this.add(d);
    } else if (mod === "update"){
      msgBtn = 'Modifier';
      titre = "Modifier un produit";
      callback = (d) => this.update(d) ;
    }

    const modal = this.modal.create({
      nzTitle: titre,
      nzContent: ProduitModalComponent,
    });
    const instance = modal.getContentComponent();
    
    instance.data = data 
    instance.msgBtn = msgBtn
    
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    // modal.afterClose.subscribe(result => {
    //   if(result) callback(result)
    // });
   
  }



  
  ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// FONCTIONS CRUD




  add(produit:Produit){
    this.list_subsc.add(this.produitService.add(produit).subscribe(
      (data) => this.utilisService.response(data, (d) => {
        this.utilisService.createNotification(
          'success',
          'Ajout reussi',
          "Le produit à été ajouté avec succes"
          )
        this.getProduits()
      }),
      (error) => {
        this.utilisService.response(error);;
        
      }
    ))
  }



  update(produit:Produit){
    this.list_subsc.add(this.produitService.update(produit).subscribe(
      (data) => this.utilisService.response(data, (d) => {
        this.utilisService.createNotification(
          'success',
          'Modification reussie',
          "Le produit à été modifié avec succes"
          )
       
        this.getProduits()
      }),
      (error) => {
        this.utilisService.response(error);;
        
      }
    ))
  }



  getProduits(obj?){
    this.dataSet = [] ;
    return
    this.tableSetting.loading = true
    this.produitService.getAll(obj).subscribe(
      data => this.utilisService.response(data,(d) => {
        console.log(d);
        this.dataSet = d ;
        this.tableSetting.loading = false
      }),
      error => this.utilisService.response(error),
    )
  }



  delete(row:Produit[]){
    let listeid = row.map(v => v.produitid)
    this.list_subsc.add(this.produitService.delete(listeid).subscribe(
      data => this.utilisService.response(data,(d) => {
        this.utilisService.createNotification(
          'success',
          'Suppression reussie',
          "Le produit à été supprimé avec succes"
          )
        this.getProduits()
      })))
    
  }




  loadFile(event){
    this.utilisService.createNotification(
      'success',
      'Votre fichier de produit a bien été chargé',
      "Veuillez patienter pendant le traitement du fichier"
      )
  }
}
