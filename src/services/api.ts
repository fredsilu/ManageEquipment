import axios, { AxiosError } from 'axios';
import { Alert } from 'react-native';


const API_BASE_URL = 'http://192.168.1.66/api/'; // URL de votre API

// Définition du type pour les données d'équipement
export interface Equipment {
  id: string;
  name: string;
  model: string;
  location: string;
  spectech: string;
  reference: string;
}

export interface Ingredient {
  id: string;
  categorie: string;
  nom_ingredient: string;
  fournisseur: string;
  unite: string;
  cout_unitaire: number;
}


export interface Client {
  id: string;
  nom_client: string;
  societe: string;
  telephone: string;
  email: string;
  adresse: string;
}


const api = {
  fetchClients:
  async (): Promise<Client[]> => {
    try {
      const response = await axios.get<Client[]>(API_BASE_URL + 'clients');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur fetchClients:", axiosError.message);
      Alert.alert("Erreur de chargement", axiosError.message);
      throw error;
    }
  },
  
  fetchClientDetails: async (clientId: string): Promise<Client> => {
    try {
      const response = await axios.get<Client>(API_BASE_URL + `clients/${clientId}`);
     
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur fetchClientDetails:", axiosError.message);
      Alert.alert("Erreur de chargement", axiosError.message);
      throw error;
    }
  },
  createClient: async (clientData: Omit<Client, 'id'>): Promise<Client> => {
    try {
      const response = await axios.post<Client>(API_BASE_URL + 'clients', clientData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur createClient:", axiosError.message);
      Alert.alert("Erreur de création", axiosError.message);
      throw error;
    }
  },
  updateClient: async (clientData: Client): Promise<Client> => {
    try {
      const response = await axios.put<Client>(API_BASE_URL + `clients?id=${clientData.id}`, clientData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur updateClient:", axiosError.message);
      Alert.alert("Erreur de mise à jour", axiosError.message);
      throw error;
    }
  },
  deleteClient: async (clientId: string): Promise<void> => {
    try {
      await axios.delete(API_BASE_URL + `clients?id=${clientId}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur deleteClient:", axiosError.message);
      Alert.alert("Erreur de suppression", axiosError.message);
      throw error;
    }
  },
  fetchIngredients: async (): Promise<Ingredient[]> => {
    try {
      const response = await axios.get<Ingredient[]>(API_BASE_URL + 'ingredients');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur fetchIngredients:", axiosError.message);
      Alert.alert("Erreur de chargement", axiosError.message);
      throw error;
    }
  },
  createIngredient: async (ingredientData: Omit<Ingredient, 'id'>): Promise<Ingredient> => {
    try {
      const response = await axios.post<Ingredient>(API_BASE_URL + 'ingredients', ingredientData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur createIngredient:", axiosError.message);
      Alert.alert("Erreur de création", axiosError.message);
      throw error;
    }
  },
  updateIngredient: async (ingredientData: Ingredient): Promise<Ingredient> => {
    try {
      const response = await axios.put<Ingredient>(API_BASE_URL + `ingredients?id=${ingredientData.id}`, ingredientData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur updateIngredient:", axiosError.message);
      Alert.alert("Erreur de mise à jour", axiosError.message);
      throw error;
    }
  },
  deleteIngredient: async (ingredientId: string): Promise<void> => {
    try {
      await axios.delete(API_BASE_URL + `ingredients?id=${ingredientId}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur deleteIngredient:", axiosError.message);
      Alert.alert("Erreur de suppression", axiosError.message);
      throw error;
    }
  },
  fetchIngredientDetails: async (ingredientId: string): Promise<any> => {
    try {
      const response = await axios.get<any>(API_BASE_URL + `ingredients/${ingredientId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur fetchIngredientDetails:", axiosError.message);
      Alert.alert("Erreur de chargement", axiosError.message);
      throw error;
    }
  },

  fetchEquipments: async (): Promise<Equipment[]> => {
    try {
      const response = await axios.get<Equipment[]>(API_BASE_URL + 'api.php');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur fetchEquipments:", axiosError.message);
      Alert.alert("Erreur de chargement", axiosError.message);
      throw error;
    }
  },
  createEquipment: async (equipmentData: Omit<Equipment, 'id'>): Promise<Equipment> => {
    try {
      const response = await axios.post<Equipment>(API_BASE_URL + 'api.php', equipmentData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur createEquipment:", axiosError.message);
      Alert.alert("Erreur de création", axiosError.message);
      throw error;
    }
  },
  updateEquipment: async (equipmentData: Equipment): Promise<Equipment> => {
    try {
      const response = await axios.put<Equipment>(API_BASE_URL + `api.php?id=${equipmentData.id}`, equipmentData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur updateEquipment:", axiosError.message);
      Alert.alert("Erreur de mise à jour", axiosError.message);
      throw error;
    }
  },
  deleteEquipment: async (equipmentId: string): Promise<void> => {
    try {
      await axios.delete(API_BASE_URL + `api.php?id=${equipmentId}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur deleteEquipment:", axiosError.message);
      Alert.alert("Erreur de suppression", axiosError.message);
      throw error;
    }
  },

  fetchCommandes: async (): Promise<any[]> => {
    try {
      const response = await axios.get<any[]>(API_BASE_URL + 'commandes');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur fetchCommandes:", axiosError.message);
      Alert.alert("Erreur de chargement", axiosError.message);
      throw error;
    }
  },
  fetchCommandesDetails: async (commandesId: string): Promise<any> => {
    try {
      const response = await axios.get<any>(API_BASE_URL + `commandes/${commandesId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur fetchCommandesDetails:", axiosError.message);
      Alert.alert("Erreur de chargement", axiosError.message);
      throw error;
    }
  },
  createCommandes: async (commandesData: any): Promise<any> => {
    try {
      const response = await axios.post<any>(API_BASE_URL + 'commandes', commandesData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur createCommandes:", axiosError.message);
      Alert.alert("Erreur de création", axiosError.message);
      throw error;
    }
  },
  updateCommandes: async (commandesData: any): Promise<any> => {
    try {
      const response = await axios.put<any>(API_BASE_URL + `commandes?id=${commandesData.id}`, commandesData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur updateCommandes:", axiosError.message);
      Alert.alert("Erreur de mise à jour", axiosError.message);
      throw error;
    }
  },
  deleteCommandes: async (commandesId: string): Promise<void> => {
    try {
      await axios.delete(API_BASE_URL + `commandes?id=${commandesId}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur deleteCommandes:", axiosError.message);
      Alert.alert("Erreur de suppression", axiosError.message);
      throw error;
    }
  },
  fetchDishes: async (): Promise<any[]> => {
    try {
      const response = await axios.get<any[]>(API_BASE_URL + 'dishes');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur fetchDishes:", axiosError.message);
      Alert.alert("Erreur de chargement", axiosError.message);
      throw error;
    }
  },
  fetchDishDetails: async (dishId: string): Promise<any> => {
    try {
      const response = await axios.get<any>(API_BASE_URL + `plats/${dishId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur fetchDishDetails:", axiosError.message);
      Alert.alert("Erreur de chargement", axiosError.message);
      throw error;
    }
  },
  createDish: async (dishData: any): Promise<any> => {
    try {
      const response = await axios.post<any>(API_BASE_URL + 'plats', dishData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur createDish:", axiosError.message);
      Alert.alert("Erreur de création", axiosError.message);
      throw error;
    }
  },
  updateDish: async (dishData: any): Promise<any> => {
    try {
      const response = await axios.put<any>(API_BASE_URL + `plats?id=${dishData.id}`, dishData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur updateDish:", axiosError.message);
      Alert.alert("Erreur de mise à jour", axiosError.message);
      throw error;
    }
  },
  deleteDish: async (dishId: string): Promise<void> => {
    try {
      await axios.delete(API_BASE_URL + `plats?id=${dishId}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur deleteDish:", axiosError.message);
      Alert.alert("Erreur de suppression", axiosError.message);
      throw error;
    }
  },
  fetchCaterers: async (): Promise<any[]> => {
    try {
      const response = await axios.get<any[]>(API_BASE_URL + 'traiteurs');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur fetchCaterers:", axiosError.message);
      Alert.alert("Erreur de chargement", axiosError.message);
      throw error;
    }
  },
  fetchCatererDetails: async (catererId: string): Promise<any> => {
    try {
      const response = await axios.get<any>(API_BASE_URL + `traiteurs/${catererId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur fetchCatererDetails:", axiosError.message);
      Alert.alert("Erreur de chargement", axiosError.message);
      throw error;
    }
  },
  createCaterer: async (catererData: any): Promise<any> => {
    try {
      const response = await axios.post<any>(API_BASE_URL + 'traiteurs', catererData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur createCaterer:", axiosError.message);
      Alert.alert("Erreur de création", axiosError.message);
      throw error;
    }
  },
  updateCaterer: async (catererData: any): Promise<any> => {
    try {
      const response = await axios.put<any>(API_BASE_URL + `traiteurs?id=${catererData.id}`, catererData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur updateCaterer:", axiosError.message);
      Alert.alert("Erreur de mise à jour", axiosError.message);
      throw error;
    }
  },
  deleteCaterer: async (catererId: string): Promise<void> => {
    try {
      await axios.delete(API_BASE_URL + `traiteurs?id=${catererId}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur deleteCaterer:", axiosError.message);
      Alert.alert("Erreur de suppression", axiosError.message);
      throw error;
    }
  },
  fetchUsers: async (): Promise<any[]> => {
    try {
      const response = await axios.get<any[]>(API_BASE_URL + 'users');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur fetchUsers:", axiosError.message);
      Alert.alert("Erreur de chargement", axiosError.message);
      throw error;
    }
  },
  fetchUserDetails: async (userId: string): Promise<any> => {
    try {
      const response = await axios.get<any>(API_BASE_URL + `users/${userId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur fetchUserDetails:", axiosError.message);
      Alert.alert("Erreur de chargement", axiosError.message);
      throw error;
    }
  },
  createUser: async (userData: any): Promise<any> => {
    try {
      const response = await axios.post<any>(API_BASE_URL + 'users', userData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur createUser:", axiosError.message);
      Alert.alert("Erreur de création", axiosError.message);
      throw error;
    }
  },
  updateUser: async (userData: any): Promise<any> => {
    try {
      const response = await axios.put<any>(API_BASE_URL + `users?id=${userData.id}`, userData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur updateUser:", axiosError.message);
      Alert.alert("Erreur de mise à jour", axiosError.message);
      throw error;
    }
  },
  deleteUser: async (userId: string): Promise<void> => {
    try {
      await axios.delete(API_BASE_URL + `users?id=${userId}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erreur deleteUser:", axiosError.message);
      Alert.alert("Erreur de suppression", axiosError.message);
      throw error;
    }
  }





};


export default api;