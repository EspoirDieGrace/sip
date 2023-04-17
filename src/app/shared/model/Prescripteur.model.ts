import { Typeprescripteur } from './typeprescripteur.model';
export interface Prescripteur {
    typeprescripteur?:   Typeprescripteur;
    prescripteurid:           number;
    prescripteurnom:          string;
    prescripteurprenom:       string;
    prescripteurcontact:      string;
    prescripteuremail:        string;
    prescripteurdatecreation: Date;
    prescriteurenable:        boolean;
}