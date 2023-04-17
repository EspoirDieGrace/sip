import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produit } from 'src/app/shared/model/Produit.model';
import { Gservice } from 'src/app/shared/model/Gservice.model';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { GserviceService } from 'src/app/shared/services/Gservice.service';

@Component({
  selector: 'app-produit-modal',
  templateUrl: './produit-modal.component.html',
  styleUrls: ['./produit-modal.component.scss']
})
export class ProduitModalComponent implements OnInit {

  itemForm:FormGroup;
  msgBtn:string;
  selectSetting: TableSetting = {
    checkbox:false,
    loading: false
  };


  listeService:any;
  data:any;
  

  constructor(
    private myModal : NzModalRef<ProduitModalComponent>,
    private fb : FormBuilder,
    private gserviceService: GserviceService,
    private utilisService : UtilisService) { }

  ngOnInit(): void {
    this.getGservices()
    this.buildForm()
  }


  buildForm(){
    console.log(this.data);
    
    let fv:Produit = this.data //FormValue

    this.itemForm = this.fb.group({
      produitid : [fv && fv.produitid ? fv.produitid : '', []],
      produitname: [fv && fv.produitname ? fv.produitname : '', [ Validators.required]],
      produitdescription: [fv && fv.produitdescription ? fv.produitdescription : '', , []],
      produitprix: [fv && fv.produitprix ? fv.produitprix : '', , []],
      gservice: [fv && fv.produitid ? fv.gservice.gserviceid : '', [ Validators.required]],
      
    });
  }


  //Submit Form
  // Verification des valeurs en sortie
  handleOk(){
    console.log(this.itemForm.value);
    let gservice = new Gservice()
    gservice.gserviceid = this.itemForm.value.gservice
    this.itemForm.value.gservice = gservice
    
    this.handleCancel(this.itemForm.value)
  }


  handleCancel(data?){
    console.log("on veut sortir");
    this.myModal.close(data);
    
  }






  getGservices(){
    this.selectSetting.loading = true
    this.gserviceService.getAll({}).subscribe(
      data => this.utilisService.response(data,(d) => {
        console.log(d);
        this.listeService = d ;
        this.selectSetting.loading = false
      }),
      error => this.utilisService.response(error),
    )
  }




}
