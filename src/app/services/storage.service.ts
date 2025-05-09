import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // Local storage for persistent data
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Session storage for temporary session data
  setSessionItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  getSessionItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  removeSessionItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Guest ticket storage
  storeGuestTicket(ticketData: any): void {
    const guestTickets = this.getGuestTickets();
    guestTickets.push({
      ...ticketData,
      storedAt: new Date().toISOString()
    });
    this.setItem('guestTickets', JSON.stringify(guestTickets));
  }

  getGuestTickets(): any[] {
    const tickets = this.getItem('guestTickets');
    return tickets ? JSON.parse(tickets) : [];
  }

  clearGuestTicket(ticketId: string): void {
    const guestTickets = this.getGuestTickets();
    const updatedTickets = guestTickets.filter(ticket => ticket.id !== ticketId);
    this.setItem('guestTickets', JSON.stringify(updatedTickets));
  }
}
