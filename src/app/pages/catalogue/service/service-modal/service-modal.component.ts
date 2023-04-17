import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gservice } from 'src/app/shared/model/Gservice.model';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss']
})
export class ServiceModalComponent implements OnInit {

  itemForm:FormGroup;
  msgBtn:string;

  data:any;
  
  constructor(
    private myModal : NzModalRef<ServiceModalComponent>,
    private fb : FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }

  initialisation(){

  }


  buildForm(){
    let fv:Gservice = this.data //FormValue 

    this.itemForm = this.fb.group({
      gserviceid: [fv && fv.gserviceid ? fv.gserviceid : '', []],
      gservicename: [fv && fv.gservicename ? fv.gservicename : '', [ Validators.required]],
      gservicecommentaire: [fv && fv.gservicecommentaire ? fv.gservicecommentaire : '', []],
      
    });
  }

  //Submit Form
  handleOk(){
    this.handleCancel(this.itemForm.value)
  }


  handleCancel(data?){
    console.log("on veut sortir");
    this.myModal.close(data);
    
  }
}
