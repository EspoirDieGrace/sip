import { Utilisateur } from './Utilisateur.model';

export class Publication {
  publicationid: number;
  publicationdatecreation: any;
  publicationenable: boolean;
  publicationtitre: string;
  publicationslug: string;
  publicationtexte:string;
  publicationimage:string;
  utilisateur:Utilisateur
}
