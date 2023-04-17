import { Prescripteur } from './../model/Prescripteur.model';
import { ConfigService } from 'ngx-envconfig';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";



@Injectable({
    providedIn:'root'
})
export class PrescripteurService{
url:"";

constructor(
    private http : HttpClient,
    private configService: ConfigService
){
    this.url= this.configService.get('HOST_API')
}


///afficher toute la liste des prescripteurs

public getAll(obj:any={}){
    return this.http.get(this.configService.getApi("PRESCRIPTEUR_GET"),{
        observe:'response'
    })
}

public add(prescripteur:Prescripteur,obj?){
 return this.http.post (this.configService.getApi("PRESCRIPTEUR_ADD"), prescripteur,{
     observe:'response'
 })
}

public update(prescripteur:Prescripteur){
    return this.http.put(this.configService.getApi("PRESCRIPTEUR_UPDATE")+"/"+prescripteur.prescripteurid, prescripteur,{
        observe:'response'
    })
}

}