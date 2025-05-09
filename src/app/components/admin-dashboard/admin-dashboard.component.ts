import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { TicketService } from'../../services/tickets.service';
import { Event } from '../../models/event.model';
import { Ticket } from '../../models/ticket.model';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  eventService = inject(EventService);
  ticketService = inject(TicketService);

  events: Event[] = [];
  tickets: Ticket[] = [];

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
    this.ticketService.getAllTickets().subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  deleteEvent(event_id: string) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(event_id).subscribe(() => {
        this.events = this.events.filter(e => e.id !== event_id);
      });
    }
  }

  cancelTicket(ticketId: string) {
    if (confirm('Are you sure you want to cancel this ticket?')) {
      this.ticketService.cancelTicket(ticketId).subscribe(ticket => {
        const index = this.tickets.findIndex(t => t.id === ticketId);
        if (index !== -1) {
          this.tickets[index] = ticket;
        }
      });
    }
  }
}
