
//definir un id est obligatoire sur les titres, ça sert a leur identification dans l'algo
//tout les menus en dessous d'un titre doivent definir le titreid
//
export interface Perms {
  create?:boolean;
  delete?:boolean;
  update?:boolean;
  id?:boolean;
  others?:boolean;
}

export interface NavItems {
  level: number;
  title: string;
  icon: string;
  url?: string;
  selected?: boolean;
  disabled?: boolean;
  open?: boolean;
  children?: NavItems[];
  permission?:Perms
}

export const navItems:NavItems[] = [
    {
        level: 1,
        title: 'Dashboard',
        icon: 'dashboard',
        url:"dashboard",
        selected: true,
        disabled: false,
        
      },
    {
      level: 1,
      title: 'Administration',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'Administrateurs',
          icon: 'user',
          url:"gestion/administrateur",
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Manager',
          icon: 'user',
          url:"gestion/manager",
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Délégué',
          icon: 'user',
          url:"gestion/delegue",
          selected: false,
          disabled: false
        },
      ]
    },
    {
      level: 1,
      title: 'Produits et Services',
      icon: 'mail',
      open: true,
      selected: false,
      disabled: false,
      children: [
        
        {
          level: 2,
          title: 'Produits',
          icon: 'shopping',
          url:"catalogue/produit",
          selected: true,
          disabled: false,
        },
        {
          level: 2,
          title: 'Visite',
          url:"catalogue/service",
          icon: 'bars',
          selected: false,
          disabled: false
        },
        {
          level: 2,
          title: 'Programme',
          url:"catalogue/service",
          icon: 'bars',
          selected: false,
          disabled: false
        }
      ]
    },
    {
      level: 1,
      title: 'Clients',
      icon: 'mail',
      open: true,
      selected: false,
      disabled: false,
      children: [
        
        {
          level: 2,
          title: 'Prescripteurs',
          icon: 'shopping',
          url:"client/prescripteur",
          selected: true,
          disabled: false,
        },
        {
          level: 2,
          title: 'Etablissement',
          url:"client/etablissement",
          icon: 'bars',
          selected: false,
          disabled: false
        }
      ]
    },
    {
        level: 1,
        title: 'Parametres',
        icon: 'setting',
        open: false,
        selected: false,
        disabled: false,
        children: [
           {
            level: 2,
            title: 'Roles',
            icon: 'usergroup-add',
            url:"parametres/role",
            selected: false,
            disabled: false
          },
          {
           level: 2,
           title: 'Type prescripteur',
           icon: 'credit-card',
           url:"parametres/typeprescripteur",
           selected: false,
           disabled: false
         },
         {
          level: 2,
          title: 'Catégorie établissement',
          icon: 'credit-card',
          url:"parametres/categorieetablissement",
          selected: false,
          disabled: false
        }
        
        ]
      },
      {
        level: 1,
        title: 'Map',
        icon: 'mail',
        open: true,
        selected: false,
        disabled: false,
        children: [
          
          {
            level: 2,
            title: 'Localité',
            icon: 'shopping',
            url:"catalogue/produit",
            selected: true,
            disabled: false,
          },
          {
            level: 2,
            title: 'Localité-Attribut',
            url:"catalogue/service",
            icon: 'bars',
            selected: false,
            disabled: false
          },
          {
            level: 2,
            title: 'Zone',
            url:"map/zone",
            icon: 'bars',
            selected: false,
            disabled: false
          }
        ]
      },
  ];