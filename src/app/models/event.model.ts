export interface Event {
  id: string;
  name: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  image_url: string;
  ticket_types: TicketType[];
}

export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  available: number;
}
