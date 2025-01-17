export interface Ingredient {
    id: number;
    categorie: string;
    nom_ingredient: string;
    fournisseur: string;
    cout_unitaire: number;
    unite: string;
  }
  
  export interface Plat {
    id: number;
    nom: string;
    description: string;
    prix: number;
    photoUrl: string; // Add this line
  }
  
  export interface PlatIngredient {
    plat_id: number;
    ingredient_id: number;
    quantite: number;
    unite_quantite: string;
  }
  
  export interface Client {
    id: number;
    nom_client: string;
    societe?: string; // Optionnelle
    telephone: string;
    email: string;
    adresse: string;
    photoUrl: string; // Add this line
  }
  
  export interface Commande {
      id: number;
      client_id: number;
      date_commande: string;
      date_evenement: string;
      nbr_pers: number;
      type_menu: string;
      prix_total: number;
  }
  
  export interface CommandePlat {
      commande_id: number;
      plat_id: number;
      quantite: number;
  }

  export interface StyledButtonProps {
    title: string;
    onPress: () => void;
  }