import { ConfigService } from 'ngx-envconfig';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzTreeComponent, NzTreeNodeOptions, NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NavItems, navItems, Perms } from "../../../../_nav";

import {TreeNode} from 'primeng/api';
import { UtilisService } from 'src/app/shared/services/Utilis.service';
import { TableSetting } from 'src/app/shared/model/TableSetting.model';


@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class RoleModalComponent implements OnInit {

  itemForm:FormGroup;
  data:any;
  msgBtn:string;
  selectSetting: TableSetting = {
    checkbox:false,
    loading: false
  };
  cols = [
    { field: 'id', header: 'Id' },
    { field: 'create', header: 'Create' },
    { field: 'update', header: 'Update' },
    { field: 'delete', header: 'Delete' },
    { field: 'other', header: 'Other' }
];
  files: TreeNode[] = []



  @ViewChild('nzTreeComponent', { static: false }) nzTreeComponent!: NzTreeComponent;
  defaultCheckedKeys = ['10020'];
  defaultSelectedKeys = ['10010'];
  defaultExpandedKeys = ['100', '1001'];

  nodes: NzTreeNodeOptions[] ;
  


  constructor(
    private myModal : NzModalRef<RoleModalComponent>,
    private utilisService : UtilisService,
    private configService: ConfigService,
    private fb : FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
    if (this.data && this.data.roledata) {
      try {
        this.files = JSON.parse(atob(this.data.roledata))
      } catch (error) {
        this.utilisService.createNotification( 'warning',
        'Données Incorrectes',
        "Le systeme rencontre des soucis au moment de la conversion des données"
        )
        this.myModal.close()
      }
    }else {
      this.files = this.buildTableNodes(navItems)
    }
   
   
  }


  buildTableNodes(nav:NavItems[], selectedNav?){
    let retArr = []
    nav.map((menu,index) => {
      let obj:any = {}
      let node = {
        title:menu.title,
        create:false,
        update:false,
        delete:false,
        other:false,
        id:false
      }
      
      if (menu.children) {
        console.log("testttss");
        console.log(menu.children);
        obj['children'] = this.buildTableNodes(menu.children,selectedNav)
      }

      obj["data"] = node
      retArr.push(obj)
    })

    return retArr
  }


  buildForm(){
    
    let fv:any = this.data //FormValue
    this.itemForm = this.fb.group({
      roleid: [fv && fv.roleid ? fv.roleid : '', []],
      rolenom: [fv && fv.rolenom ? fv.rolenom : '', [ Validators.required]],
      roledata: [fv && fv.roledata ? fv.roledata : '',  [ Validators.required]],
    });
  }



  buildMenu(selectedMenu:NzTreeNodeOptions[]){
    console.log("item");
    let arrMenu:any = selectedMenu.map(menu => menu.key)
    return arrMenu
  }





  verif(val,col, row, subRow){
    console.log(val,col);
    console.log('-----------Row--------');
    console.log(row);
    console.log('-----------subRow--------');
    console.log(subRow);

    console.log('-----------subRow End--------');
    // SI la ligne a des enfants ? 
    // Parcourir ses enfants et pour chaque enfant mettre 
    // la valeur de la colone selectionnee
    if (subRow && subRow.node.children) {
      subRow.node.children = subRow.node.children.map(obj => {
        obj.data[col] = val 
        console.log('val',val);
        
        return obj
      })
    }
    console.log(this.files);
    
    this.itemForm.controls.roledata.setValue(this.files)
    
  }

  nzClick(event: NzFormatEmitEvent): void {
    //console.log(event);
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(event);
    this.itemForm.controls.roledata.setValue(this.nzTreeComponent.getCheckedNodeList())
    console.log(
       "CHecked Node List ",
        this.nzTreeComponent.getCheckedNodeList(),
        "Selected Node List ",
        this.nzTreeComponent.getHalfCheckedNodeList(),
      );
  }

  // nzSelectedKeys change
  nzSelect(keys: string[]): void {

  }
  //Submit Form
  handleOk(){
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };
    console.log(this.files);
    
    this.itemForm.value.roledata = btoa(JSON.stringify(this.files,getCircularReplacer()))

console.log(this.itemForm.value);

    this.handleCancel(this.itemForm.value)
  }


  handleCancel(data?){
    console.log("on veut sortir");
    this.myModal.close(data);
    
  }
}
