import { Rdv } from './Rdv.model';
import { Souscription } from './Souscription.model';

export class Achat {
    achatid: number;
    achatdatecreation: any;
    achatenable: boolean;
    achatname: string;
    achatstatus: string;
    achatcode:string;
    achatpenaliteenable:string;
    achatdevise:string;
    achatmontant:number;
    achatmsisdn:string;
    achatrefpanier:string;
    achatreponsemessage:string;
    achatcommentaire:string;
    rdv: Rdv;
    Souscription: Souscription;
  }
  