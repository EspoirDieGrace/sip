import { Typepdv } from './Typepdv.model';
import { Commune } from './Commune.model';
import { Gservice } from './Gservice.model';

export class Pdv {
  pdvid: number;
  pdvdatecreation: any;
  pdvname: string;
  pdvcommentaire: string;
  pdvenable: boolean;
  pdvcontact: string;
  pdvheureouverture: string;
  pdvheurefermeture: string;
  pdvjourouverture: string[];
  pdvlong: string;
  pdvlat: string;
  pdvaddress: string;
  pdvstatus: string;
  commune: Commune;
  typepdv: Typepdv;
  services: Gservice;


  }
  


