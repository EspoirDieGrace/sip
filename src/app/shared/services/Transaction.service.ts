import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Transaction } from '../model/Transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
// Class de service permettant de gerer les entreprises 
url = "";

  constructor(
      private http: HttpClient,
      private configService: ConfigService) { 
        this.url = this.configService.get('HOST_API');
      }


      
  //Afficher toutes les transactions
  public getAll(obj) {
    let data =  {
      'typename':obj &&  obj.typename ? [obj.typename] : '',
      'pdvid':obj &&  obj.pdvid ? obj.pdvid : '',
      'utilisateurid':obj &&  obj.utilisateurid ? obj.utilisateurid : '',
    }
    return this.http.get(this.configService.getApi("TRANSACTION_GET"), {
      observe: 'response',
      params:data
    });
  }

  //Afficher toutes les transactions
  public getAllStatus() {
    return this.http.get(this.configService.getApi("TRANSACTION_GET_STATUS"), {
      observe: 'response'
    });
  }

  
  //Modifier une transaction
  public update(transaction:Transaction) {
    let data =  {
      'status':transaction.transactionstatus,
    }
    return this.http.put(this.configService.getApi("TRANSACTION_UPD") + "/"+ transaction.transactionid , transaction,{
      observe: 'response',
      params:data
    });
  }



  //Supprimer une transaction
  public delete(listid) {
    return this.http.delete(this.configService.getApi("VILLE_DEL"),{
      observe: 'response',
      params:{listid}
    });
  }


  
}
