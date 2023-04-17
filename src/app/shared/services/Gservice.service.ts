import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Gservice } from '../model/Gservice.model';

@Injectable({
  providedIn: 'root'
})
export class GserviceService {
// Class de service permettant de gerer les entreprises 
url = "";

  constructor(
      private http: HttpClient,
      private configService: ConfigService) { 
        this.url = this.configService.get('HOST_API');
      }


      
  //Afficher toutes les gservices
  public getAll(obj) {
    let data = {
      'ville': obj &&  obj.ville ? obj.ville : '',
      'gservice': obj &&  obj.gservice ? obj.gservice : '',
      'pdvid': obj &&  obj.pdvid ? obj.pdvid : '',
      'specialite': obj &&  obj.specialite ? obj.specialite: ''
    }
    return this.http.get(this.configService.getApi("GSERVICE_GET"), {
      observe: 'response',
      params:data
    });
  }


  //Ajouter une gservice
  public add(gservice:Gservice) {
    return this.http.post(this.configService.getApi("GSERVICE_ADD"), gservice,{
      observe: 'response'
    });
  }


  //Modifier une gservice
  public update(gservice:Gservice) {
    return this.http.put(this.configService.getApi("GSERVICE_UPD") + "/"+ gservice.gserviceid , gservice,{
      observe: 'response'
    });
  }



  //Supprimer une gservice
  public delete(listid) {
    return this.http.delete(this.configService.getApi("GSERVICE_DEL"),{
      observe: 'response',
      params:{listid}
    });
  }


  
}
