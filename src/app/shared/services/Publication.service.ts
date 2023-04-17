import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Publication } from '../model/Publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
// Class de service permettant de gerer les entreprises
url = "";

  constructor(
      private http: HttpClient,
      private configService: ConfigService) {
        this.url = this.configService.get('HOST_API');
      }



  //Afficher toutes les publications
  public getAll(obj) {
    let data = {
      'ville': obj &&  obj.ville ? obj.ville : '',
      'commune': obj &&  obj.commune ? obj.commune : '',
      'type': obj &&  obj.type ? obj.type : '',
      'etablissement': obj &&  obj.etablissement ? obj.etablissement: '',
      'utilisateur': obj &&  obj.utilisateur ? obj.utilisateur: ''
    }
    return this.http.get(this.configService.getApi("PUBLICATION_GET"), {
      observe: 'response',
      params:data
    });
  }

  //Afficher toutes les publications par etablissement
  public getbyEtablissement(etablissementid:number) {
    return this.http.get(this.configService.getApi("PUBLICATION_GET_BY_ETABLISSEMENT") + "/" + etablissementid, {
        observe: 'response'
    });
  }


  //Ajouter une publication
  public add(publication:Publication) {
    let formdata = new FormData()
    formdata.append("publication",JSON.stringify(publication))
    return this.http.post(this.configService.getApi("PUBLICATION_ADD"), formdata,{
      observe: 'response'
    });
  }


  //Modifier une publication
  public update(publication:Publication) {
    let formdata = new FormData()
    formdata.append("publication",JSON.stringify(publication))
    return this.http.put(this.configService.getApi("PUBLICATION_UPD") + "/"+ publication.publicationid , formdata,{
      observe: 'response'
    });
  }



  //Supprimer une publication
  public delete(listid) {
    return this.http.delete(this.configService.getApi("PUBLICATION_DEL") ,{
      observe: 'response',
      params:{listid}
    });
  }



}
