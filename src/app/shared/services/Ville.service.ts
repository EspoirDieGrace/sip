import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Ville } from '../model/Ville.model';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
// Class de service permettant de gerer les entreprises 
url = "";

  constructor(
      private http: HttpClient,
      private configService: ConfigService) { 
        this.url = this.configService.get('HOST_API');
      }


      
  //Afficher toutes les villes
  public getAll() {
    return this.http.get(this.configService.getApi("VILLE_GET"), {
      observe: 'response'
    });
  }


  //Ajouter une ville
  public add(ville:Ville) {
    return this.http.post(this.configService.getApi("VILLE_ADD"), ville,{
      observe: 'response'
    });
  }


  //Modifier une ville
  public update(ville:Ville) {
    return this.http.put(this.configService.getApi("VILLE_UPD") + "/"+ ville.villeid , ville,{
      observe: 'response'
    });
  }



  //Supprimer une ville
  public delete(listid) {
    return this.http.delete(this.configService.getApi("VILLE_DEL"),{
      observe: 'response',
      params:{listid}
    });
  }


  
}
