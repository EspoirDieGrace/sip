import { Role } from "./Role.model";

export interface Utilisateur {
  role:Role;
  utilisateurid:            number;
  utilisateurnom:           string;
  utilisateurprenom:        string;
  utilisateurpassword:      string;
  utilisateurcontact:       string;
  utilisateuremail:         string;
  utilisateurenable:        boolean;
  utilisateurdatenaissance: Date;
  utilisateurdatecreation:  Date;
}
