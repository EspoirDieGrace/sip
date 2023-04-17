import { Categorieetablissement } from './../model/catetablissement.model';
import { ConfigService } from 'ngx-envconfig';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable({providedIn:'root'})

export class CatetablissementService{
    url:"";

    constructor(
        private http:HttpClient,
        private configService: ConfigService
    ){
        this.url= this.configService.get('HOST_API')
    }

    public getAll(obj:any={}){
        return this.http.get(this.configService.getApi("CATETABLISSEMENT_GET"),{
            observe:'response'
        })
    }

    public add(catetablissement:Categorieetablissement, obj?){
        return this.http.post(this.configService.getApi("CATETABLISSEMENT_ADD"),catetablissement,{
            observe:'response'
        })
    }

    public update(catetablissement:Categorieetablissement, obj?){
        return this.http.put(this.configService.getApi("CATETABLISSEMENT_UPD")+"/"+catetablissement.catetabid,catetablissement,{
            observe:'response'
        })
    }

    public delete(id){
        return this.http.delete(this.configService.getApi("CATETABLISSEMENT_DEL")+"/"+id,{
            observe:'response'
        })
    }
}