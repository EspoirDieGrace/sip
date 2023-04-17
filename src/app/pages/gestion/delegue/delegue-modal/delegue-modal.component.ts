import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { UtilisateurService } from 'src/app/shared/services/Utilisateur.service';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { TypeutilisateurService } from 'src/app/shared/services/Typeutilisateur.service';
import { Typeutilisateur } from 'src/app/shared/model/Typeutilisateur.model';
import { Utilisateur } from 'src/app/shared/model/Utilisateur.model';
import { ConfigService } from 'ngx-envconfig';
@Component({
  selector: 'app-delegue-modal',
  templateUrl: './delegue-modal.component.html',
  styleUrls: ['./delegue-modal.component.scss']
})
export class DelegueModalComponent implements OnInit {
  
  itemForm:FormGroup;
  msgBtn:string;
  selectSetting: TableSetting = {
    checkbox:false,
    loading: false
  };

  SelectedTypeutilisateur=4 //STatic
  listeTypeutilisateur:any;

  data:any;
  defaultRole= this.configService.get("role").ROLE_ADMINISTRATEUR

  constructor(
    private myModal : NzModalRef<DelegueModalComponent>,
    private utilsateurService : UtilisateurService,
    private configService: ConfigService,
    private typeutilisateurService : TypeutilisateurService,
    private fb : FormBuilder,
    private utilisService : UtilisService,) { }


  ngOnInit(): void {
    this.buildForm(); 
    //this.getTypesutilisateur()
  }

  initialisation(){

  }


  buildForm(){
    console.log(this.data);
    let fv:Utilisateur = this.data //FormValue


    this.itemForm = this.fb.group({
      utilisateurid: [fv && fv.utilisateurid ? fv.utilisateurid : '', []],
      utilisateuremail: [fv && fv.utilisateuremail ? fv.utilisateuremail : '', [Validators.email, Validators.required]],
      utilisateurnom: [fv && fv.utilisateurnom ? fv.utilisateurnom : '', [Validators.required]],
      utilisateurprenom: [fv && fv.utilisateurprenom ? fv.utilisateurprenom : '', [Validators.required]],
      utilisateurpassword: [{value:fv && fv.utilisateurpassword ? fv.utilisateurpassword : '', disabled:fv && fv.utilisateurpassword },  [Validators.required, Validators.minLength(6)]],
      utilisateurconfirmpassword: [{value:fv && fv.utilisateurpassword ? fv.utilisateurpassword : '', disabled:fv && fv.utilisateurpassword }, [Validators.required, this.confirmationValidator]],
      utilisateurcontact: [fv && fv.utilisateurcontact ? fv.utilisateurcontact : '', []],
      utilisateurdatenaissance: [fv && fv.utilisateurdatenaissance ? fv.utilisateurdatenaissance : '', []],
      role: [{roleid:this.defaultRole},[]],
    });
  }


  confirmationValidator =  (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { required: true };
      } else if (control.value !== this.itemForm.controls.utilisateurpassword.value) {
        return { confirm: true, warning: true };
      }
      return {};
    };
  


  confirmationValidatorGroup(fgroup:FormGroup) {
    let pass = fgroup.get('utilisateurpassword').value;
    let confirm_pass = fgroup.get('utilisateurconfirmpassword').value;
    return pass == confirm_pass ? { warning: true } : {};
    
  } 

  handleOk(){
    console.log(this.itemForm.value);
    this.handleCancel(this.itemForm.value)
  }


  handleCancel(data?){
    console.log("on veut sortir");
    this.myModal.close({data});
    
  }
}
