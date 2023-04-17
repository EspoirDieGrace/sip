import { Categorieetablissement } from './../../../../shared/model/catetablissement.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
import { ConfigService } from 'ngx-envconfig';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { UtilisService } from 'src/app/shared/services/Utilis.service';

@Component({
  selector: 'app-catetablissement-modal',
  templateUrl: './catetablissement-modal.component.html',
  styleUrls: ['./catetablissement-modal.component.scss']
})
export class CatetablissementModalComponent implements OnInit {

  itemForm:FormGroup;
  msgBtn:string;
  selectSetting: TableSetting = {
    checkbox:false,
    loading: false
  };
  data:any;
  constructor(
    private myModal : NzModalRef<CatetablissementModalComponent>,
    private configService: ConfigService,
    private fb : FormBuilder,
    private utilisService : UtilisService,) { }

  ngOnInit(): void {
    this.buildForm()
  }


  buildForm(){
    let fc:Categorieetablissement= this.data;
console.log(this.data);

    this.itemForm=this.fb.group({
      catetabid:[fc && fc.catetabid ? fc.catetabid:'',[]],
      catetabdescription:[fc && fc.catetabdescription ? fc.catetabdescription:'',[]],
      catetablibelle:[fc && fc.catetablibelle ? fc.catetablibelle:'',[Validators.required]]
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
