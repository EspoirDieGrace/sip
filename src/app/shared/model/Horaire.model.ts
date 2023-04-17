import { Specialite } from './Specialite.model';
import { Etablissement } from './Etablissement.model';
import { Rdv } from './Rdv.model';
import { Utilisateur } from './Utilisateur.model';

export class Horaire {
    horaireid: number;
    horairedatecreation: any;
    horaireenable: boolean;
    horairename: string;
    horairestatus: string;
    horaireduree:number;
    horairedatedebut:any;
    horairedatefin:any;
    specialite:Specialite;
    etablissement:Etablissement;
    rdv: Rdv;
    utilisateur:Utilisateur;
  }
  