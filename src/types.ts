export interface GPSLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export type DeliveryStatus = 'PENDENTE' | 'EM_ROTA' | 'ENTREGUE' | 'PROBLEMA';

export interface DeliveryOccurrence {
  id: string;
  status: DeliveryStatus;
  timestamp: string;
  location?: GPSLocation;
  receiverName?: string;
  photo?: string; // Base64 representation or mock image key
  notes?: string;
}

export interface Delivery {
  id: string;
  invoiceNumber: string; // Número da NF
  volumes: number; // Quantidade de volumes
  clientName: string; // Nome do local de entrega
  address: string; // Endereço de entrega
  observations?: string; // Observações adicionais
  status: DeliveryStatus;
  assignedDriver?: string; // Nome do motorista designado
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  receiverName?: string;
  photo?: string; // Base64 delivery proof
  gpsLocation?: GPSLocation;
  occurrences: DeliveryOccurrence[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'DRIVER';
}
