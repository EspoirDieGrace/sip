import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Typepdv } from 'src/app/shared/model/Typepdv.model';

@Component({
  selector: 'app-type-pdv-modal',
  templateUrl: './type-pdv-modal.component.html',
  styleUrls: ['./type-pdv-modal.component.scss']
})
export class TypePdvModalComponent implements OnInit {

  itemForm:FormGroup;
  type:number; // Add / Mod
  msgBtn:string;

  data:any;
  
  constructor(
    private myModal : NzModalRef<TypePdvModalComponent>,
    private fb : FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }

  initialisation(){

  }


  buildForm(){
    let fv:Typepdv = this.data //FormValue 
    this.itemForm = this.fb.group({
      typepdvid: [fv && fv.typepdvid ? fv.typepdvid : '', []],
      typepdvlibelle: [fv && fv.typepdvlibelle ? fv.typepdvlibelle : '', [ Validators.required]],
      typepdvdescription: [fv && fv.typepdvdescription ? fv.typepdvdescription : '', []],
      
    });
  }



  //Submit Form
  handleOk(){
    delete this.itemForm.value.typepdvdescription
    this.handleCancel(this.itemForm.value)
  }


  handleCancel(data?){
    console.log("on veut sortir");
    this.myModal.close(data);
    
  }
}
