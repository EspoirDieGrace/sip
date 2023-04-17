import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Pdv } from '../model/Pdv.model';

@Injectable({
  providedIn: 'root'
})
export class PdvService {
// Class de service permettant de gerer les entreprises 
url = "";

  constructor(
      private http: HttpClient,
      private configService: ConfigService) { 
        this.url = this.configService.get('HOST_API');
      }


      
  //Afficher toutes les pdvs
  public getAll(obj) {
    let data = {
      'villeid': obj &&  obj.villeid ? obj.villeid : '',
      'communeid': obj &&  obj.communeid ? obj.communeid : '',
      'type': obj &&  obj.type ? obj.type : '',
    }
    return this.http.get(this.configService.getApi("PDV_GET"), {
      observe: 'response',
      params:data
    });
  }


  //Ajouter une pdv
  public add(pdv:Pdv, obj?) {
    let data = {
      services: obj &&  obj.services ? obj.services : '',
      produits: obj &&  obj.produits ? obj.produits : '',
      utilisateurid: obj &&  obj.utilisateurid ? obj.utilisateurid : '',
    }
    return this.http.post(this.configService.getApi("PDV_ADD"), pdv,{
      observe: 'response',
      params:data
    });
  }


  //Modifier une pdv
  public update(pdv:Pdv, obj?) {
    let data = {
      services: obj &&  obj.services ? obj.services : '',
      produits: obj &&  obj.produits ? obj.produits : '',
      utilisateurid: obj &&  obj.utilisateurid ? obj.utilisateurid : '',
    }
    return this.http.put(this.configService.getApi("PDV_UPD") + "/"+ pdv.pdvid , pdv,{
      observe: 'response',
      params:data
    });
  }



  //Supprimer une pdv
  public delete(listid) {
    return this.http.delete(this.configService.getApi("PDV_DEL"),{
      observe: 'response',
      params:{listid}
    });
  }


  
}
