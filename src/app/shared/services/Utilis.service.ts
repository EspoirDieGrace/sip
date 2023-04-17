import { Injectable } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ConfigService } from 'ngx-envconfig';
import { format } from 'date-fns';

import { v5 as uuidv5 } from 'uuid';
import * as CryptoJS from 'crypto-js';
import { Utilisateur } from '../model/Utilisateur.model';

@Injectable({
  providedIn: 'root',
})
export class UtilisService {
  listeJour: any = [
    { jour: 'Lundi', key: '1' },
    { jour: 'Mardi', key: '2' },
    { jour: 'Mercredi', key: '3' },
    { jour: 'Jeudi', key: '4' },
    { jour: 'Vendredi', key: '5' },
    { jour: 'Samedi', key: '6' },
    { jour: 'Dimanche', key: '7' },
  ];

  constructor(
    private configService: ConfigService,
    private notification: NzNotificationService
  ) {}

  createNotification(type: string, titre: string, message?: string): void {
    this.notification.create(type, titre, message ? message : '');
  }

  public getPerms(user: any, screen) {
    let permissions = JSON.parse(
      atob(user.typeutilisateur.permission.permissiondata)
    );
    return permissions;
  }

  public getDeleteWarningmessage(message) {
    return `Êtes vous sûr de vouloir supprimer ${message}`;
  }

  ß;
  public compareWith(type: string) {
    return (o1, o2) => o1[type ? type : ''] == o2[type ? type : ''];
  }

  dateToShortstring(date: Date): string {
    return format(date, 'HH:mm:ss.000');
  }

  dateTostring(date: Date): string {
    return format(date, 'yyyy-MM-dd HH:mm:ss.000');
  }

  dateFromHour(date: string): Date {
    let str = `${format(new Date(), 'yyyy-MM-dd')} ${date}`;
    console.log(str);

    return new Date(str);
  }

  /**
   * Utility fonction for remove all hibernateLazyInitializer object in an object
   * @param object
   */
  deleteHibernate(object) {
    for (const key in object) {
      if (key == 'hibernateLazyInitializer') {
        delete object[key];
      } else if (typeof object[key] == 'object') {
        object[key] = this.deleteHibernate(object[key]);
      }
    }
    return object;
  }

  encryptUsingAES256(request: string, token) {
    console.log('----------------------------------');
    console.log(request, token);

    let _key = CryptoJS.enc.Utf8.parse(token);
    let _iv = CryptoJS.enc.Utf8.parse(token);
    let encrypted = CryptoJS.AES.encrypt(request, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  //CustomerId
  getId(data: any) {
    let MY_NAMESPACE = 'a543fcce-b252-11ea-b3de-0242ac130004';
    return uuidv5(JSON.stringify(data), MY_NAMESPACE);
  }

  chkObj(obj, screen) {
    // Verifie si obj.title = screen
    if (obj && obj.title && obj.title == screen) {
      return true;
    }
    return false;
  }

  chkPermArr(liste, screen) {
    console.log(liste, screen);
    let deft;

    for (let i = 0; i < liste.length; i++) {
      const element = liste[i];
      if (this.chkObj(element, screen)) {
        return element;
      }

      if (element.children) {
        deft = this.chkPermArr(element.children, screen);
      }
    }

    return deft;
  }

  getUserPerm(user: Utilisateur, screen) {}

  response(data, cb?) {
    console.log(data);
    let objet = data.url
      .replace(this.configService.get('HOST_API'), '')
      .split('/')[0];
    console.log(objet);
    let statuscode = data.status;
    switch (statuscode) {
      case 200: {
        if (cb) {
          cb(data.body);
        }
        break;
      }
      case 201: {
        if (cb) {
          cb(data.body);
        }
        break;
      }
      case 204: {
        if (cb) {
          cb(data.body);
        }
        this.createNotification(
          'info',
          `Attention, Liste vide !`,
          `La requête vers <b> ${objet}</b> a retournée une liste vide`
        );
        break;
      }
      case 400: {
        if (cb) {
          cb(data);
        }
        this.createNotification(
          'warning',
          'Attention !',
          this.configService.get('400Message')
        );

        break;
      }
      case 401: {
        if (cb) {
          cb(data);
        }
        this.createNotification(
          'warning',
          'Attention !',
          this.configService.get('401Message')
        );

        break;
      }
      case 403: {
        if (cb) {
          cb(data);
        }
        this.createNotification(
          'warning',
          'Attention !',
          this.configService.get('403Message')
        );

        break;
      }
      case 406: {
        if (cb) {
          cb(data);
        }
        this.createNotification(
          'warning',
          'Attention !',
          this.configService.get('406Message')
        );

        break;
      }
      case 409: {
        if (cb) {
          cb(data);
        }
        this.createNotification(
          'warning',
          'Attention !',
          this.configService.get('409Message')
        );
        break;
      }
      case 423: {
        if (cb) {
          cb(data);
        }
        this.createNotification(
          'warning',
          'Attention !',
          this.configService.get('423Message')
        );
        break;
      }
      case 500: {
        if (cb) {
          cb(data);
        }
        this.createNotification(
          'error',
          'Erreur !',
          this.configService.get('401Message')
        );
        break;
      }
      default: {
        if (cb) {
          cb(data);
        }
        this.createNotification(
          'warning',
          'Serveur inaccessible !',
          this.configService.get('default')
        );
        break;
      }
    }
  }
}
