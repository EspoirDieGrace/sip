import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Produit } from '../model/Produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
// Class de service permettant de gerer les entreprises 
url = "";

  constructor(
      private http: HttpClient,
      private configService: ConfigService) { 
        this.url = this.configService.get('HOST_API');
      }


      
  //Afficher toutes les produits
  public getAll(obj) {
   console.log(obj);
   
    let data = {
      'serviceid': obj &&  obj.serviceid &&  obj.serviceid.length > 0 ? obj.serviceid : '',
      'pdvid': obj &&  obj.pdvid ? obj.pdvid : '',
    }
    console.log(data);
    
    return this.http.get(this.configService.getApi("PRODUIT_GET"), {
      observe: 'response',
      params:data
    });
  }


  //Ajouter une produit
  public add(produit:Produit) {
    return this.http.post(this.configService.getApi("PRODUIT_ADD"), produit,{
      observe: 'response'
    });
  }


  //Modifier une produit
  public update(produit:Produit) {
    return this.http.put(this.configService.getApi("PRODUIT_UPD") + "/"+ produit.produitid , produit,{
      observe: 'response'
    });
  }



  //Supprimer une produit
  public delete(listid) {
    return this.http.delete(this.configService.getApi("PRODUIT_DEL"),{
      observe: 'response',
      params:{listid}
    });
  }


  
}
