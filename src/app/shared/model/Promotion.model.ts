import { Produit } from './Produit.model';
import { Utilisateur } from './Utilisateur.model';

export interface Promotion {
  produits?: Produit[];
  promotioncode?: string;
  promotiondatecreation?: Date;
  promotiondatedebut?: Date;
  promotiondatefin?: Date;
  promotionenable?: boolean;
  promotionid?: number;
  promotionlibelle?: string;
  promotionstatut?: string;
  promotiontauxreduction?: number;
  utilisateurs?: Utilisateur[];
}
