import { localiteAttribut } from './localiteattribut.model';
import { Localite } from './localite.model';
export interface Etablissement{
    localite?: Localite;
    localiteattribut?: localiteAttribut
    etablissementid?: number;
    etablissementnom?: string;
    etablissementdescription?: string;
    etablissementemail?: string;
    etablissementcontact?: string;
    etablissementdatecreation?: Date;
    etablissementjourouvrable?: Date;
    etablissementstatut?: boolean;
    etablissementenable?: boolean;
}