import { ConfigService } from 'ngx-envconfig';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginObject } from '../model/LoginObject.model';
import { Utilisateur } from '../model/Utilisateur.model';

import { SocialAuthService } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private _data = new BehaviorSubject<any>({});
  public _perm = new BehaviorSubject<any>({});
  public _flatNav = new BehaviorSubject<any>({});

  public set user(value){
    //this._data = value
    this._data.next(value);
  }
  public get user(){
    return this._data.getValue();
  }


  public set userPerm(value:any[]){
    //this._data = value
    this._perm.next(value);
  }
  public get userPerm(){
    return this._perm.getValue();
  }



  public set userFlatNav(value:any[]){
    //this._data = value
    this._flatNav.next(value);
  }
  public get userFlatNav(){
    return this._flatNav.getValue();
  }

  role:any = this.configService.get("role")

  constructor(private http: HttpClient,
    private configService: ConfigService,
    private authService: SocialAuthService
    ) {

    }

  public checkUser(){
    return this._data
  }

  public login(connexion: LoginObject): Observable<HttpResponse<any>> {
    return this.http.post(this.configService.getApi("USER_CONNECT") , connexion, {
      observe: 'response'
    });
  }


  public logout(): void {
    this.removeUserToLocalStorage();
  }

  addUserToLocalStorage(user : any){
    console.log(user);
    user = user as Utilisateur
    if(localStorage.getItem('goil_user')!=null){


      localStorage.removeItem('goil_user');
      localStorage.setItem('goil_user',JSON.stringify(user));
      console.log(localStorage.getItem('goil_user'));
    }else{

      localStorage.setItem('goil_user',JSON.stringify(user));
    }
  }

  /**
   * Permet d'obtenir le code de la permission dun user sur une interface
   */
  getpermissionIcode(permissionlibelle){
    let val = this.userPerm.filter(p => p.permissionlibelle.startsWith(permissionlibelle))
    return val[0].permissioncode
  }

  removeUserToLocalStorage(){
    //this.authService.signOut(false)
    localStorage.removeItem('goil_user');
  }





}
