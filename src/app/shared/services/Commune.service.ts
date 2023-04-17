import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Commune } from '../model/Commune.model';

@Injectable({
  providedIn: 'root'
})
export class CommuneService {
// Class de service permettant de gerer les entreprises 
url = "";

  constructor(
      private http: HttpClient,
      private configService: ConfigService) { 
        this.url = this.configService.get('HOST_API');
      }


      
  //Afficher toutes les communes
  public getAll(obj) {
    let data = {
      'villeid': obj &&  obj.villeid ? obj.villeid : '',
      'communeid': obj &&  obj.commune ? obj.commune : '',
      'type': obj &&  obj.type ? obj.type : '',
      'specialite': obj &&  obj.specialite ? obj.specialite: ''
    }
    return this.http.get(this.configService.getApi("COMMUNE_GET"), {
      observe: 'response',
      params:data
    });
  }


  //Ajouter une commune
  public add(commune:Commune) {
    return this.http.post(this.configService.getApi("COMMUNE_ADD"), commune,{
      observe: 'response'
    });
  }


  //Modifier une commune
  public update(commune:Commune) {
    return this.http.put(this.configService.getApi("COMMUNE_UPD") + "/"+ commune.communeid , commune,{
      observe: 'response'
    });
  }



  //Supprimer une commune
  public delete(listid) {
    return this.http.delete(this.configService.getApi("COMMUNE_DEL"),{
      observe: 'response',
      params:{listid}
    });
  }


  
}
