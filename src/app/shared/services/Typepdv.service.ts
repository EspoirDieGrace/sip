import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Typepdv } from '../model/Typepdv.model';

@Injectable({
  providedIn: 'root'
})
export class TypepdvService {
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
      'pdv': obj &&  obj.pdv ? obj.pdv : '',
      'villeid': obj &&  obj.villeid ? obj.villeid : '',
      
    }
    return this.http.get(this.configService.getApi("TYPEPDV_GET"), {
      observe: 'response',
      params:data
    });
  }


  //Ajouter une type
  public add(type:Typepdv) {
    
    return this.http.post(this.configService.getApi("TYPEPDV_ADD"), type,{
      observe: 'response'
    });
  }


  //Modifier une type
  public update(type:Typepdv) {
    return this.http.put(this.configService.getApi("TYPEPDV_UPD") + "/"+ type.typepdvid , type,{
      observe: 'response'
    });
  }



  //Supprimer une type
  public delete(listid) {
    return this.http.delete(this.configService.getApi("TYPEPDV_DEL") ,{
      observe: 'response',
      params:{listid}
    });
  }


  
}
