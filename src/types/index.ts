// Para a navegação
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  TripForm: { trip?: Trip }; // A tela pode receber uma viagem para edição
};

// Para os dados de uma Viagem
export interface Trip {
  id: string;
  title: string;
  description: string;
  cityCountry: string;
  date: string; // Armazenamos como string ISO
  imageUrl?: string | null;
  userId: string;
}