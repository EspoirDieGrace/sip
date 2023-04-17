import { Zone } from './zone.model';
import { localiteAttribut } from './localiteattribut.model';
export interface Localite{
    localiteid?: number;
    localitedescription?: string;
    localiteenable?: boolean;
    localitedatecreation?: Date;
    localiteattribut?: localiteAttribut;
    zone?: Zone
}