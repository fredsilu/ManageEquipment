import { ParamListBase } from '@react-navigation/native';



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
  plat_id: string;
  ingredient_id: number;
  nom_ingredient: string;
  categorie: string;
  quantite: number;
  unite_quantite: string;
  cout_unitaire: number;
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

export interface Traiteur {
  id: number;
  client_id: number;
  commande_id: number;
  plat_id: number;
  quantite: number;
  prix: number;
}


export interface User
{
  id: number;
  nom: string;
  email: string;    
  username: string; 
  password: string; 
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


export interface RootStackParamList extends ParamListBase {

  Ingredients: undefined;

  DetailsIngredient: { itemId: string };

}


export interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: any; // Pour personnaliser les styles
}