import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Typetransaction } from '../model/Typetransaction.model';

@Injectable({
  providedIn: 'root'
})
export class TypetransactionService {
// Class de service permettant de gerer les entreprises 
url = "";

  constructor(
      private http: HttpClient,
      private configService: ConfigService) { 
        this.url = this.configService.get('HOST_API');
      }


      
  //Afficher toutes les typetransactions
  public getAll() {
    return this.http.get(this.configService.getApi("TYPETRANSACTION_GET"), {
      observe: 'response'
    });
  }


  //Ajouter une typetransaction
  public add(typetransaction:Typetransaction) {
    return this.http.post(this.configService.getApi("TYPETRANSACTION_ADD"), typetransaction,{
      observe: 'response'
    });
  }


  //Modifier une typetransaction
  public update(typetransaction:Typetransaction) {
    return this.http.put(this.configService.getApi("TYPETRANSACTION_UPD") + "/"+ typetransaction.typetransactionid , typetransaction,{
      observe: 'response'
    });
  }



  //Supprimer une typetransaction
  public delete(listid) {
    return this.http.delete(this.configService.getApi("TYPETRANSACTION_DEL"),{
      observe: 'response',
      params:{listid}
    });
  }


  
}
