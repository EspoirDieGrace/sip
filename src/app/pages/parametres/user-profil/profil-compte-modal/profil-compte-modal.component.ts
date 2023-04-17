

import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ville } from 'src/app/shared/model/Ville.model';

@Component({
  selector: 'app-profil-compte-modal',
  templateUrl: './profil-compte-modal.component.html',
  styleUrls: ['./profil-compte-modal.component.scss']
})
export class ProfilCompteModalComponent implements OnInit {

  itemForm:FormGroup;
  data:any;
  msgBtn:string;

  
  constructor(
    private myModal : NzModalRef<ProfilCompteModalComponent>,
    private fb : FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }



  buildForm(){
    console.log();
    let fv:Ville = this.data //FormValue 

    const reg = "[0-9]*"
    this.itemForm = this.fb.group({
      numero: [fv && fv.villeid ? fv.villeid : '',[Validators.pattern(reg)]],
      villename: [fv && fv.villename ? fv.villename : '' , [ Validators.pattern(reg),Validators.required]],
      operateur: ['', [Validators.required]],
      otp: ['', []],
    });
  }


  //Submit Form
  handleOk(){
    //console.log(this.itemForm.value);
    
    this.handleCancel(this.itemForm.value)
  }


  checkValidator(event){
    console.log(event);
    if(event == 'ORANGE') this.itemForm.controls.otp.setValidators(Validators.required)
    console.log(this.itemForm);
        
  }

  handleCancel(data?){
    console.log("on veut sortir");
    this.myModal.close(data);
    
  }
}
