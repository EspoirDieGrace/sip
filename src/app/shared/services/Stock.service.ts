import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Produit } from '../model/Produit.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
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
      'pdvid': obj &&  obj.pdvid ? obj.pdvid : '',
    }
    console.log(data);
    
    return this.http.get(this.configService.getApi("STOCKS_GET"), {
      observe: 'response',
      params:data
    });
  }



  //Modifier une produit
  public update(produit:Produit,pdvid,status) {
    
    let data:any = {
      'pdvid': pdvid ? pdvid : '',
      'produitid': produit.produitid ? produit.produitid : '',
      'status': status,
    }
    return this.http.put(this.configService.getApi("STOCKS_UPD") , {},{
      observe: 'response',
      params:data
    });
  }



  
}
