import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ServiceModalComponent } from './service-modal/service-modal.component';
import { Subscription } from 'rxjs';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { ConfigService } from 'ngx-envconfig';
import { GserviceService } from 'src/app/shared/services/Gservice.service';
import { Gservice } from 'src/app/shared/model/Gservice.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

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
    private gserviceService: GserviceService
  ) { }

  ngOnInit(): void {
    this.getServices()
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
      titre = "Ajouter un service";
      callback =  (d) =>  this.add(d);
    } else if (mod === "update"){
      msgBtn = 'Modifier';
      titre = "Modifier un service";
      callback = (d) => this.update(d) ;
    }
    const modal = this.modal.create({
      nzTitle: titre,
      nzContent: ServiceModalComponent,
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




  add(service:Gservice){
    this.list_subsc.add(this.gserviceService.add(service).subscribe(
      (data) => this.utilisService.response(data, (d) => {
        this.utilisService.createNotification(
          'success',
          'Ajout reussi',
          "Le service à été ajouter avec succes"
          )
        this.getServices()
      }),
      (error) => {
        this.utilisService.response(error);;
        
      }
    ))
  }



  update(service:Gservice){
    this.list_subsc.add(this.gserviceService.update(service).subscribe(
      (data) => this.utilisService.response(data, (d) => {
        this.utilisService.createNotification(
          'success',
          'Modification reussie',
          "Le service à été modifier avec succes"
          )
       
        this.getServices()
      }),
      (error) => {
        this.utilisService.response(error);;
        
      }
    ))
  }



  getServices(){
    this.dataSet = []
    return
    this.tableSetting.loading = true
    this.gserviceService.getAll({}).subscribe(
      data => this.utilisService.response(data,(d) => {
        console.log(d);
        this.dataSet = d ;
        this.tableSetting.loading = false
      }),
      error => this.utilisService.response(error),
    )
  }



  delete(row:Gservice[]){
    let listeid = row.map(v => v.gserviceid)
    this.list_subsc.add(this.gserviceService.delete(listeid).subscribe(
      data => this.utilisService.response(data,(d) => {
        this.utilisService.createNotification(
          'success',
          'Suppression reussie',
          "Le service à été supprimé avec succes"
          )
        this.getServices()
      })))
    
  }



}
