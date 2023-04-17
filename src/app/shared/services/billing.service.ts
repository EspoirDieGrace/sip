import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Commande } from '../model/Commande.model';
import { v5 as uuidv5 } from 'uuid';
import { UtilisService } from './Utilis.service';


@Injectable({
  providedIn: 'root'
})


export class BillingService {

  // Class de service permettant de gerer les entreprises
  urlGateway = "";
  backUrl="";
  dataGateway:any={};
  accountMsinfo:any={};
  //validationUrl : string = this.configService.get("validationUrl");
  tokenFromMs: string = this.configService.get("GSKey");

  constructor(
    private http: HttpClient,
    private utilisService: UtilisService,
    private configService: ConfigService) {
      //this.urlGateway = this.configService.get('urlGateway');
      this.accountMsinfo = this.configService.get("gatewayData")
    }



  //Afficher toutes les rdvs
  getPayUrl(montant,typetransaction,id_customer,obj?) {
    this.fillPayObject(montant,typetransaction,id_customer,obj);
    console.log('this.dataGateway-----------',this.dataGateway);
    //return JSON.stringify(this.dataGateway)
    //let test_data ='{"typetransaction":"Recharge","montant":"500","sessionid":"1647cdd9-3f2c-","utilisateurid":8,"msisdn":"77597758","operateur":"ORANGE"} '
    return this.utilisService.encryptUsingAES256(JSON.stringify(this.dataGateway),this.tokenFromMs);
    //return this.utilisService.encryptUsingAES256(test_data,this.tokenFromMs);
  }


  fillPayObject(montant,typetransaction,id_customer,obj?){
    //remplis les infos relative au payment
    this.dataGateway["typetransaction"] = typetransaction
    this.dataGateway["montant"] = montant;
    this.dataGateway["sessionid"] = this.utilisService.getId({}).substring(0,14);
    this.dataGateway["utilisateurid"] = id_customer

    this.dataGateway["pdvid"] =   obj &&  obj.pdvid ? obj.pdvid : undefined;
    this.dataGateway["produitid"] = obj &&  obj.produitid ? obj.produitid : undefined;

    this.dataGateway["msisdn"] = obj &&  obj.msisdn ? obj.msisdn : '';

    this.dataGateway["operateur"] = obj &&  obj.operateur ? obj.operateur : '';;
    this.dataGateway["quantite"] = undefined
  }




  //Effectuer une 
  // Aussi utilser pour recharger le compte Gas&oil
  public processPayment(data,type) {
    console.log('===------------====',data);
    
    let obj = {
      secret:this.getPayUrl(
        `${data.montant}`,
        type,
        data.utilissateurid,
        data
      ),
      login:this.accountMsinfo.user,
      password:this.accountMsinfo.pass
    }
    console.log(obj);
    
    return this.http.get(this.configService.getApi("TRANSACTION_ADD") +`?secret=${encodeURIComponent(obj.secret)}&login=${obj.login}&password=${obj.password}`,{
      observe: 'response'
    });
  }


  //Commander un produit
  public commandeProduit(commandeObj) {
   
    let obj = {
      secret:this.utilisService.encryptUsingAES256(JSON.stringify(this.dataGateway),this.tokenFromMs),
      login:this.accountMsinfo.user,
      password:this.accountMsinfo.pass
    }
    console.log(obj);
    
    return this.http.get(this.configService.getApi("TRANSACTION_COMMANDE_ADD") +`?secret=${encodeURIComponent(obj.secret)}&login=${obj.login}&password=${obj.password}`,{
      observe: 'response'
    });
  }
}
