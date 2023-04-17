import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { ConfigService } from 'ngx-envconfig';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { Role } from 'src/app/shared/model/Role.model';
import { RoleService } from 'src/app/shared/services/Role.service';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  list_subsc:Subscription = new Subscription();
  itemForm:FormGroup;
  modelChange:any = {};
  dataSet:any;
  tableSetting: TableSetting = {
    checkbox:false,
    loading: false
  };

  obj:any = {typeid:3};


  constructor(
    private modal: NzModalService,
    private utilisService : UtilisService,
    private configService : ConfigService,
    private fb : FormBuilder,
    private roleService: RoleService,
  ) {}

  ngOnInit(): void {
    this.getRoles()
  }



  ngOnDestroy(): void {
    this.list_subsc.unsubscribe()
  }

  openModal(mod, data?:any): void {
    let titre = "";
    let msgBtn = "";
    let callback:any;
    if (mod === "add") {
      msgBtn = 'Ajouter';
      titre = "Ajouter un role";
      callback =  (d,obj) =>  this.add(d,obj);
    } else if (mod === "update"){
      msgBtn = 'Modifier';
      titre = "Modifier un role ";
      callback = (d,obj) => this.update(d,obj) ;
    }
    const modal = this.modal.create({
      nzTitle: titre,
      nzWidth: 650,
      nzContent: RoleModalComponent,
    });
    const instance = modal.getContentComponent();
    instance.data = data
    instance.msgBtn = msgBtn
    
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      if(result){
        console.log(result);
        callback(result as Role) 
      }
    });

   
  }


  ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// FONCTIONS CRUD

  

  add(role:Role, obj?){
    this.list_subsc.add(this.roleService.add(role).subscribe(
      (data) => this.utilisService.response(data, (d) => {
        this.utilisService.createNotification(
          'success',
          'Ajout reussi',
          "Le role à été ajouté avec succes"
          )
        this.getRoles()
      }),
      (error) => {
        this.utilisService.response(error);;
        
      }
    ))
  }



  update(role:Role,obj?){
    this.list_subsc.add(this.roleService.update(role).subscribe(
      (data) => this.utilisService.response(data, (d) => {
        this.utilisService.createNotification(
          'success',
          'Modification reussie',
          "Le role à été modifié avec succes"
          )
       
        this.getRoles()
      }),
      (error) => {
        this.utilisService.response(error);;
        
      }
    ))
  }



  getRoles(){
    this.dataSet = []
    this.tableSetting.loading = true
    this.roleService.getAll(this.obj).subscribe(
      data => this.utilisService.response(data,(d) => {
        console.log(d);
        this.dataSet = d ;
        this.tableSetting.loading = false
      }),
      error => this.utilisService.response(error),
    )
  }



  delete(row:Role){
    this.list_subsc.add(this.roleService.delete(row.roleid).subscribe(
      data => this.utilisService.response(data,(d) => {
        this.utilisService.createNotification(
          'success',
          'Suppression reussie',
          "Le role à été supprimé avec succes"
          )
        this.getRoles()
      })))
    
  }


}
