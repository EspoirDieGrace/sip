import { Typeprescripteur } from './../model/typeprescripteur.model';
import { ConfigService } from 'ngx-envconfig';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";


@Injectable({providedIn:'root'})

export class TypeprescripteurService{
    url:"";

    constructor(
        private http:HttpClient,
        private configService: ConfigService
    ){
        this.url= this.configService.get('HOST_API')
    }

    public getAll(obj:any={}){
        return this.http.get(this.configService.getApi("TYPEPRESCRIPTEUR_GET"),{
            observe:'response'
        })
    }

    public add(typeprescripteur:Typeprescripteur, obj?){
        return this.http.post(this.configService.getApi("TYPEPRESCRIPTEUR_ADD"),typeprescripteur,{
            observe:'response'
        })
    }

    public update(typeprescripteur:Typeprescripteur, obj?){
        return this.http.put(this.configService.getApi("TYPEPRESCRIPTEUR_UPD")+"/"+typeprescripteur.typeprescripteurid,typeprescripteur,{
            observe:'response'
        })
    }

    public delete(id){
        return this.http.delete(this.configService.getApi("TYPEPRESCRIPTEUR_DEL")+"/"+id,{
            observe:'response'
        })
    }
}