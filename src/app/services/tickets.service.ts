import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Ticket, TicketPurchase } from '../models/ticket.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.baseUrl}/tickets`;
  private token:any;
  storage = inject(StorageService);



  constructor(){
    this.token = localStorage.getItem('token');
    console.log('Token from localStorage:', this.token);
  }

  getUserTickets(): Observable<Ticket[]> {
    const headers = { 'Authorization': `Bearer ${this.token}` };
    return this.http.get<Ticket[]>(`${this.baseUrl}/user`, { headers });
  }

  getUserGuestTickets(): Observable<Ticket[]> {
    let guestToken = localStorage.getItem('guestToken');
    let ticket_ids = this.storage.getGuestTickets();
    const headers = { 'Authorization': `Bearer ${guestToken}` };
    return this.http.post<Ticket[]>(`${this.baseUrl}/guest-tickets`, ticket_ids, { headers });
  }

  purchaseTickets(purchase: TicketPurchase): Observable<Ticket[]> {
    const headers = { 'Authorization': `Bearer ${this.token}` };
    return this.http.post<Ticket[]>(`${this.baseUrl}/purchase`, purchase, { headers });
  }

  purchaseTicketsAsGuest(purchase: TicketPurchase): Observable<Ticket[]> {
    let guestToken = localStorage.getItem('guestToken');
    const headers = { 'Authorization': `Bearer ${guestToken}` };
    return this.http.post<Ticket[]>(`${this.baseUrl}/purchase`, purchase, { headers });
  }

  verifyTicket(ticketId: string): Observable<{valid: boolean, message: string}> {
    const headers = { 'Authorization': `Bearer ${this.token}` };
    return this.http.get<{valid: boolean, message: string}>(`${this.baseUrl}/verify/${ticketId}`, { headers });
  }

  checkInTicket(ticketId: string): Observable<Ticket> {
    const headers = { 'Authorization': `Bearer ${this.token}` };
    return this.http.post<Ticket>(`${this.baseUrl}/checkin/${ticketId}`, {}, { headers });
  }

  getAllTickets(): Observable<Ticket[]> {
    const headers = { 'Authorization': `Bearer ${this.token}` };
    return this.http.get<Ticket[]>(`${this.baseUrl}/all`, { headers });
  }

  cancelTicket(ticketId: string): Observable<Ticket> {
    const headers = { 'Authorization': `Bearer ${this.token}` };
    return this.http.post<Ticket>(`${this.baseUrl}/cancel/${ticketId}`, {}, { headers });
  }
}import { StorageService } from './storage.service';

