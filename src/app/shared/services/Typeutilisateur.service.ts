import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Typeutilisateur } from '../model/Typeutilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class TypeutilisateurService {
// Class de service permettant de gerer les entreprises 
url = "";

  constructor(
      private http: HttpClient,
      private configService: ConfigService) { 
        this.url = this.configService.get('HOST_API');
      }


      
  //Afficher toutes les types
  public getAll(obj?) {
    let data =  {
      'role':obj &&  obj.role ? obj.role : '',
      'etablissement': obj &&  obj.etablissement ? obj.etablissement: '',
      'specialite': obj &&  obj.specialite ? obj.specialite : '',
      'villeid': obj &&  obj.villeid ? obj.villeid : '',
      
    }
    return this.http.get(this.configService.getApi("TYPEUTILSATEUR_GET"), {
      observe: 'response',
      params:data
    });
  }


  //Ajouter une type
  public add(type:Typeutilisateur) {
    
    return this.http.post(this.configService.getApi("TYPEUTILSATEUR_ADD"), type,{
      observe: 'response'
    });
  }


  //Modifier une type
  public update(type:Typeutilisateur) {
    return this.http.put(this.configService.getApi("TYPEUTILSATEUR_UPD") + "/"+ type.typeutilisateurid , type,{
      observe: 'response'
    });
  }



  //Supprimer une type
  public delete(listid) {
    return this.http.delete(this.configService.getApi("TYPEUTILSATEUR_DEL") ,{
      observe: 'response',
      params:{listid}
    });
  }


  
}
