import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Utilisateur } from '../model/Utilisateur.model';
import { LoginObject } from '../model/LoginObject.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  url = "";

  constructor(
      private http: HttpClient,
      private configService: ConfigService) { 
        this.url = this.configService.get('HOST_API');
      }


  /*
    Afficher toutes les Utilisateurs
   */
  public getAll(obj: any ={}) {

    let data =  {
      'roleid':obj &&  obj.role ? obj.role : '',
    }
    console.log(data);
    
    console.log("getallService");
 return this.http.get(this.configService.getApi("USER_GET") , {
   observe: 'response',
   params:data
 });
 }



  //Ajouter un Utilisateur
  public add(utilisateur:Utilisateur,obj?) {
    
    return this.http.post(this.configService.getApi("USER_ADD"), utilisateur,{
      observe: 'response'
    });
  }

  
  //Modifier un Utilisateur
  public update(utilisateur:Utilisateur,obj?) {
    return this.http.put(this.configService.getApi("USER_UPD") + "/"+  utilisateur.utilisateurid, utilisateur,{
      observe: 'response',
    });
  }



  //Supprimer un Utilisateur
  public delete(listid) {
    return this.http.delete(this.configService.getApi("USER_DEL")+"/"+listid,{
      observe: 'response',
      params:{listid}
    });
  }


  //Connecter un Utilisateur
  public login(login:LoginObject) {
    return this.http.post(this.configService.getApi("USER_CONNECT") , login ,{
      observe: 'response'
    });
  }



  //obtenir le profil d'un Utilisateur
  public getProfil(userid) {
    return this.http.get(this.configService.getApi("USER_PROFIL_GET") + "/" + userid ,{
      observe: 'response'
    });
  }



  //Mise a jour du profil
  public setProfil(user:Utilisateur, file) {
    let formdata = new FormData()
    
    formdata.append("utilisateur",JSON.stringify(user))
    formdata.append('file', file, file.name);
    return this.http.put(this.configService.getApi("USER_PROFIL_UPD")+'/'+user.utilisateurid , formdata  ,{
      observe: 'response'
    });
  }



  //Mise a jour du password du profil
  public setProfilPassword(user:Utilisateur,login:LoginObject) {
    return this.http.put(this.configService.getApi("USER_PROFIL_UPD_PASS") +'/'+user.utilisateurid , login ,{
      observe: 'response'
    });
  }



  //Forgot password du compte
  public forgotPassword(login:LoginObject) {
    return this.http.post(this.configService.getApi("USER_PROFIL_FORGOT_PASS") , login ,{
      observe: 'response'
    });
  }



  //Reset password du profil
  public resetPassword(login:LoginObject) {
    return this.http.post(this.configService.getApi("USER_PROFIL_RESET_PASS") , login ,{
      observe: 'response'
    });
  }



  
}

