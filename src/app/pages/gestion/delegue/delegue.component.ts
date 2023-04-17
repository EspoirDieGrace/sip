import { DelegueModalComponent } from './delegue-modal/delegue-modal.component';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subscription } from 'rxjs';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { ConfigService } from 'ngx-envconfig';
import { UtilisateurService } from 'src/app/shared/services/Utilisateur.service';
import { Utilisateur } from 'src/app/shared/model/Utilisateur.model';

@Component({
  selector: 'app-delegue',
  templateUrl: './delegue.component.html',
  styleUrls: ['./delegue.component.scss']
})
export class DelegueComponent implements OnInit {

  list_subsc: Subscription = new Subscription();

  dataSet: any;
  tableSetting: TableSetting = {
    checkbox: false,
    loading: false,
  };
  obj:any = {}
  defaultRole= this.configService.get("role").ROLE_DELEGUE

  constructor(
    private modal: NzModalService,
    private utilisService: UtilisService,

    private configService: ConfigService,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    this.getUtilisateurs();
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
      titre = 'Ajouter un délégué';
      callback = (d, obj) => this.add(d, obj);
    } else if (mod === 'update') {
      msgBtn = 'Modifier';
      titre = 'Modifier un délégué';
      callback = (d, obj) => this.update(d, obj);
    }
    const modal = this.modal.create({
      nzTitle: titre,
      nzWidth: 650,
      nzContent: DelegueModalComponent,
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

  ////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// FONCTIONS CRUD ADMINISTRATEUR

  add(utilisateur: Utilisateur, obj?) {
    this.list_subsc.add(
      this.utilisateurService.add(utilisateur, obj).subscribe(
        (data) =>
          this.utilisService.response(data, (d) => {
            this.utilisService.createNotification(
              'success',
              'Ajout reussi',
              "L'administrateur à été ajouté avec succes"
            );
            this.getUtilisateurs();
          }),
        (error) => {
          this.utilisService.response(error);
        }
      )
    );
  }

  update(utilisateur: Utilisateur, obj?) {
    this.list_subsc.add(
      this.utilisateurService.update(utilisateur,obj).subscribe(
        (data) => this.utilisService.response(data, (d) => {
            this.utilisService.createNotification(
              'success',
              'Modification reussie',
              "L'administrateur à été modifié avec succes"
            );
console.log('-------------------------------------ggggggupdate');

            this.getUtilisateurs();
          }),
        (error) => {
          this.utilisService.response(error);
        }
      )
    );
  }

  getUtilisateurs(obj?:any) {
    this.dataSet = []
    
    this.tableSetting.loading = true
    this.utilisateurService.getAll({role:this.defaultRole}).subscribe(
      data => this.utilisService.response(data,(d) => {
        console.log(d);
        this.dataSet = d ;
        this.tableSetting.loading = false
      }),
      error => this.utilisService.response(error),
    )
  }

  delete(row: Utilisateur[]) {
    let listeid = row.map((v) => v.utilisateurid);
    this.list_subsc.add(
      this.utilisateurService.delete(listeid).subscribe((data) =>
        this.utilisService.response(data, (d) => {
          this.utilisService.createNotification(
            'success',
            'Suppression reussie',
            'Le utilisateur à été supprimé avec succes'
          );
          this.getUtilisateurs();
        })
      )
    );
  }
}
