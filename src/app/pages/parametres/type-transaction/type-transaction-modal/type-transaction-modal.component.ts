import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Typetransaction } from 'src/app/shared/model/Typetransaction.model';

@Component({
  selector: 'app-type-transaction-modal',
  templateUrl: './type-transaction-modal.component.html',
  styleUrls: ['./type-transaction-modal.component.scss']
})
export class TypeTransactionModalComponent implements OnInit {


  itemForm:FormGroup;
  data:any;
  msgBtn:string;

  
  constructor(
    private myModal : NzModalRef<TypeTransactionModalComponent>,
    private fb : FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }



  buildForm(){
    console.log();
    let fv:Typetransaction = this.data //FormValue 

    this.itemForm = this.fb.group({
      typetransactionid: [fv && fv.typetransactionid ? fv.typetransactionid : '',[]],
      typetransactionlibelle: [fv && fv.typetransactionlibelle ? fv.typetransactionlibelle : '' , [ Validators.required]],
      typetransactioncommentaire: [fv && fv.typetransactioncommentaire ? fv.typetransactioncommentaire : '', []],
      
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
