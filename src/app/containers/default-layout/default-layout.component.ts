import { Component, OnInit } from '@angular/core';
import { navItems } from "../../_nav";
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigService } from 'ngx-envconfig';
import { AuthentificationService } from 'src/app/shared/services/authentification.service';
import { Utilisateur } from '../../shared/model/Utilisateur.model';
@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  menus = []; 

  isCollapsed = false;
  connUser:Utilisateur
  permissions:any[];
  constructor(
    private router : Router,
    private activatedRoute:ActivatedRoute,
    private configService: ConfigService,
    private auth : AuthentificationService,
  ) { 
    //this.connUser = JSON.parse(localStorage.getItem('goil_user')).utilisateur;
    //this.permissions = JSON.parse(atob(this.connUser.typeutilisateur.permission.permissiondata)) // JSON.parse(this.connUser.typeutilisateur.permission.permissiondata)
  }

  ngOnInit(): void {
    console.log(this.permissions, navItems);
    console.log("------------------------------");
    //console.log(this.getAuthMenuV2(this.permissions, navItems));
    
    this.menus = navItems
    //this.menus = this.getAuthMenuV2(this.permissions, JSON.parse(JSON.stringify(navItems)))
  }



  getAuthMenuV2(permission:any[], navItems:any[]){
    return navItems.reduce((acc,curr,ind)=>{
      if (!curr['children']) {
        //si on a pas de sous menu
        
        if (this.checkifhasglobalpermission(permission[ind])) {
          acc.push(curr)
        }//verifie si il a ce menu
      }else {
        //si on a un children
        let child = this.getAuthMenuV2(permission[ind].children, curr['children'])
        if (child.length > 0) {
          curr['children'] = child
          acc.push(curr)
        }

      }
      return acc
    },[])
  }

  checkifhasglobalpermission(obj){
    
    for (const key in obj.data) {
      if (obj.data[key] == true) return true
    }
    return false
  }


  versProfil(){
    this.router.navigate(['/pages/parametres/profile']);
  }

  logout(){
    //this.auth.logout();
    this.router.navigate(['/']);
  }


}
