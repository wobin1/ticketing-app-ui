export interface Event {
  id: string;
  name: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  imageUrl: string;
  ticket_types: TicketType[];
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  available: number;
}
