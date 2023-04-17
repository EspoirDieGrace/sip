import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TypetransactionService } from 'src/app/shared/services/Typetransaction.service';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { Typetransaction } from 'src/app/shared/model/Typetransaction.model';
import { Subscription } from 'rxjs';
import { ConfigService } from 'ngx-envconfig';
import { TypeTransactionModalComponent } from './type-transaction-modal/type-transaction-modal.component';

@Component({
  selector: 'app-type-transaction',
  templateUrl: './type-transaction.component.html',
  styleUrls: ['./type-transaction.component.scss']
})
export class TypeTransactionComponent implements OnInit {

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
    private typetransactionService: TypetransactionService
  ) { }

  ngOnInit(): void {
    this.getTypetransactions()
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
      titre = "Ajouter un type de transaction";
      callback =  (d) =>  this.add(d);
    } else if (mod === "update"){
      msgBtn = 'Modifier';
      titre = "Modifier un type de transaction";
      callback = (d) => this.update(d) ;
    }
    const modal = this.modal.create({
      nzTitle: titre,
      nzContent: TypeTransactionModalComponent,
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




  add(typetransaction:Typetransaction){
    this.list_subsc.add(this.typetransactionService.add(typetransaction).subscribe(
      (data) => this.utilisService.response(data, (d) => {
        this.utilisService.createNotification(
          'success',
          'Ajout reussi',
          "Le type de transaction à été ajouter avec succes"
          )
        this.getTypetransactions()
      }),
      (error) => {
        this.utilisService.response(error);;
        
      }
    ))
  }



  update(typetransaction:Typetransaction){
    this.list_subsc.add(this.typetransactionService.update(typetransaction).subscribe(
      (data) => this.utilisService.response(data, (d) => {
        this.utilisService.createNotification(
          'success',
          'Modification reussie',
          "Le type de transaction à été modifier avec succes"
          )
       
        this.getTypetransactions()
      }),
      (error) => {
        this.utilisService.response(error);;
        
      }
    ))
  }



  getTypetransactions(){
    this.dataSet = [];
    return


    this.tableSetting.loading = true
    this.typetransactionService.getAll().subscribe(
      data => this.utilisService.response(data,(d) => {
        console.log(d);
        this.dataSet = d ;
        this.tableSetting.loading = false
      }),
      error => this.utilisService.response(error),
    )
  }



  delete(row:Typetransaction[]){
    let listeid = row.map(v => v.typetransactionid)
    this.list_subsc.add(this.typetransactionService.delete(listeid).subscribe(
      data => this.utilisService.response(data,(d) => {
        this.utilisService.createNotification(
          'success',
          'Suppression reussie',
          "Le type de transaction à été supprimé avec succes"
          )
        this.getTypetransactions()
      })))
    
  }



}
