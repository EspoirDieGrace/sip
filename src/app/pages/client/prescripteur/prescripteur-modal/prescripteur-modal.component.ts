import { TypeprescripteurService } from 'src/app/shared/services/typeprescripteur.service';
import { Prescripteur } from './../../../../shared/model/Prescripteur.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { NzModalRef } from 'ng-zorro-antd';
import { ConfigService } from 'ngx-envconfig';
import { UtilisService } from 'src/app/shared/services/Utilis.service';

@Component({
  selector: 'app-prescripteur-modal',
  templateUrl: './prescripteur-modal.component.html',
  styleUrls: ['./prescripteur-modal.component.scss']
})
export class PrescripteurModalComponent implements OnInit {

  itemForm:FormGroup;
  msgBtn:string;
  selectSetting: TableSetting = {
    checkbox:false,
    loading: false
  };
  listetypeprescripteur:any;
  enable:Boolean = true;
  data:any;
  constructor(
    private myModal : NzModalRef<PrescripteurModalComponent>,
    private configService: ConfigService,
    private fb : FormBuilder,
    private utilisService : UtilisService,
    private typeprescripteurservice:TypeprescripteurService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getTypeprescripteur();
  }

  buildForm(){
    let fc:Prescripteur= this.data;

    this.itemForm=this.fb.group({
      prescripteurid:[fc && fc.prescripteurid ? fc.prescripteurid:'',[]],
      prescripteurnom:[fc && fc.prescripteurnom ? fc.prescripteurnom:'',[Validators.required]],
      prescripteurprenom:[fc && fc.prescripteurprenom ? fc.prescripteurprenom:'',[Validators.required]],
      prescripteurcontact:[fc && fc.prescripteurcontact ? fc.prescripteurcontact:'',[Validators.required]],
      prescripteuremail:[fc && fc.prescripteuremail ? fc.prescripteuremail:'',[Validators.required]],
      typeprescripteur: [fc && fc.typeprescripteur ? fc.typeprescripteur : [], []]
    })
  }

  handleOk(){
    console.log(this.itemForm.value);
    this.handleCancel(this.itemForm.value)
  }
  handleCancel(data?){
    console.log("on veut sortir");
    this.myModal.close({data});
    
  }

  compareTypeprescripteur(o1:any, o2:any ) {
    return o1 && o2 && o1.typeprescripteurid === o2.typeprescripteurid
  }

  
  getTypeprescripteur(){
    this.selectSetting.loading = true
    this.typeprescripteurservice.getAll().subscribe(
      data => this.utilisService.response(data,(d) => {
        console.log(d);
        this.listetypeprescripteur = d ;
        this.selectSetting.loading = false
      }),
      error => this.utilisService.response(error),
    )
  }
}
