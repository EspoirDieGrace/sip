import { Utilisateur } from './Utilisateur.model';

export class Notification {
    notificationid: number;
    notificationdatecreation: any;
    notificationdateread:any;
    notificationisread: boolean;
    notificationtexte: string;
    notificationtype: string;
    utilisateur:Utilisateur;
  }
  