import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Permission } from '../model/Permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
// Class de service permettant de gerer les entreprises 
url = "";

  constructor(
      private http: HttpClient,
      private configService: ConfigService) { 
        this.url = this.configService.get('HOST_API');
      }


      
  //Afficher toutes les permissions
  public getAll(obj:any={}) {
    let data =  {
      'role': obj &&  obj.role ? obj.role : '',
      'utilisateur': obj && obj.utilisateur ? obj.utilisateurid : '',
      'specialite': obj &&  obj.specialite ? obj.specialite : '',
      'etablissement': obj &&  obj.etablissement ? obj.etablissement : '',
      'ville': obj &&  obj.ville ? obj.ville: '',
      'commune': obj &&  obj.commune ? obj.commune : '',
      'typeid': obj &&  obj.typeid ? obj.typeid : ''
    }
    
    return this.http.get(this.configService.getApi("PERMISSION_GET"), {
      observe: 'response',
      params:data
    });
  }

  
      
  //Afficher la permission qui a pour libelle
  public getPermission(roleid,libelle) {
   
    return this.http.get(this.configService.getApi("PERMISSION_GET_BY_ROLE") +'/'+ roleid+'/'+libelle , {
      observe: 'response'
    });
  }

  //Ajouter une permission
  public add(permission:Permission) {
    return this.http.post(this.configService.getApi("PERMISSION_ADD"), permission,{
      observe: 'response'
    });
  }


  //Modifier une permission
  public update(permission:Permission) {
    return this.http.put(this.configService.getApi("PERMISSION_UPD") + "/"+ permission.permissionid , permission,{
      observe: 'response'
    });
  }
  

  //Supprimer une permission
  public delete(listid) {
    return this.http.delete(this.configService.getApi("PERMISSION_DEL"),{
      observe: 'response',
      params:{listid}
    });
  }
}
