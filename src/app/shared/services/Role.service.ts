import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Role } from '../model/Role.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  // Class de service permettant de gerer les entreprises
  url = '';

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.url = this.configService.get('HOST_API');
  }

  //Afficher toutes les roles
  public getAll(obj?) {
    let data: any = {};
    if (obj && obj.type) {
      data['type'] = obj.type;
    }
    return this.http.get(this.configService.getApi('ROLE_GET'), {
      observe: 'response',
      params: data,
    });
  }

  //Ajouter une role
  public add(role: any) {
    return this.http.post(this.configService.getApi('ROLE_ADD'), role, {
      observe: 'response',
    });
  }

  //Modifier une role
  public update(role: Role) {
    return this.http.put(
      this.configService.getApi('ROLE_UPD') + '/' + role.roleid,
      role,
      {
        observe: 'response',
      }
    );
  }

  //Supprimer une role
  public delete(listid) {
    return this.http.delete(
      this.configService.getApi('ROLE_DEL') + '/' + listid,
      {
        observe: 'response',
        params: {},
      }
    );
  }
}
