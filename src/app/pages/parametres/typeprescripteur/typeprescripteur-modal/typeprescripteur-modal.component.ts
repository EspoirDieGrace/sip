import { Typeprescripteur } from './../../../../shared/model/typeprescripteur.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { ConfigService } from 'ngx-envconfig';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { UtilisService } from 'src/app/shared/services/Utilis.service';

@Component({
  selector: 'app-typeprescripteur-modal',
  templateUrl: './typeprescripteur-modal.component.html',
  styleUrls: ['./typeprescripteur-modal.component.scss']
})
export class TypeprescripteurModalComponent implements OnInit {

  itemForm:FormGroup;
  msgBtn:string;
  selectSetting: TableSetting = {
    checkbox:false,
    loading: false
  };
  data:any;
  constructor(
    private myModal : NzModalRef<TypeprescripteurModalComponent>,
    private configService: ConfigService,
    private fb : FormBuilder,
    private utilisService : UtilisService,) { }

  ngOnInit(): void {
    this.buildForm()
  }


  buildForm(){
    let fc:Typeprescripteur= this.data;
console.log(this.data);

    this.itemForm=this.fb.group({
      typeprescripteurid:[fc && fc.typeprescripteurid ? fc.typeprescripteurid:'',[]],
      typeprescripteurdescription:[fc && fc.typeprescripteurdescription ? fc.typeprescripteurdescription:'',[]],
      typeprescripteurlibelle:[fc && fc.typeprescripteurlibelle ? fc.typeprescripteurlibelle:'',[Validators.required]]
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
}
