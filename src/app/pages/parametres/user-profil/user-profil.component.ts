import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { ProfilCompteModalComponent } from './profil-compte-modal/profil-compte-modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BillingService } from 'src/app/shared/services/billing.service';
import { Utilisateur } from 'src/app/shared/model/Utilisateur.model';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { TransactionService } from 'src/app/shared/services/Transaction.service';
import { UtilisateurService } from 'src/app/shared/services/Utilisateur.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {


  list_subsc:Subscription = new Subscription();
  obj: any;
  dataSet:any;
  tableSetting: TableSetting = {
    checkbox:false,
    loading: false
  };
  connUser:Utilisateur = JSON.parse(localStorage.getItem('goil_user')).utilisateur;
  constructor(
    private  billingService: BillingService,
    private modal: NzModalService,
    private transactionService: TransactionService,
    private utilisService : UtilisService,
    private utilisateurService : UtilisateurService
  ) { 
    this.obj = {
      typename: "Recharge",
    };
  }

  ngOnInit(): void {
    this.getTransactions(this.obj);
    this.getSolde()
    console.log(this.connUser);
    
  }



  open(): void {
    
    const modal = this.modal.create({
      nzTitle: 'Recharger mon compte',
      nzContent: ProfilCompteModalComponent,
    });
    
    
    //modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      console.log(result);
      if (result) {
        try {
          let sendObj = {
            montant: parseInt(result.villename),
            utilissateurid: this.connUser.utilisateurid,
            operateur:result.operateur,
            msisdn: result.numero
          }
          this.list_subsc.add(
            this.billingService.processPayment(sendObj,'Cash').subscribe(
              (data) =>
                this.utilisService.response(data, (d) => {
                  this.utilisService.createNotification(
                    'success',
                    'Rechargement en cours',
                    "Veuillez patientez pendant la mise à jour de votre compte"
                  );
                this.getSolde()
                }),
              (error) => {
                this.utilisService.response(error);
              }
            )
          );
        
        } catch {
          this.utilisService.createNotification('warning',"Parametres incorrectes")
        }
       
      }
    });

   
  }




  pingTransactionStatus(){

  }


  getSolde(){
    this.utilisateurService.getProfil(this.connUser.utilisateurid).subscribe(
      data => {
        this.connUser = Object.assign({},data.body as Utilisateur)
        let local_data = JSON.parse(localStorage.getItem('goil_user'))
        local_data.utilisateur = this.connUser
        localStorage.setItem('goil_user', JSON.stringify(local_data))
      }
    )
  }




  getTransactions(obj) {
    this.tableSetting.loading = true;
    this.transactionService.getAll(obj).subscribe(
      (data) =>
        this.utilisService.response(data, (d) => {
          console.log(d);
          this.dataSet = d;
          this.tableSetting.loading = false;
        }),
      (error) => this.utilisService.response(error)
    );
  }

}
