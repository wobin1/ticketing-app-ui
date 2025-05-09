export interface Ticket {
  id: string;
  event_id: string;
  userId: string | null; // null for guest purchases until account creation
  ticket_type_id: string;
  purchase_date: Date;
  status: 'active' | 'used' | 'canceled';
  qr_code: string;
  attendee_name: string;
  attendee_email: string;
}

export interface TicketPurchase {
  event_id: string;
  tickets: {
    ticket_type_id: string;
    quantity: number;
    attendees: {
      name: string;
      email: string;
    }[];
  }[];
}
