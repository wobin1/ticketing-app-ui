import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { TicketService } from'../../services/tickets.service';
import { Event } from '../../models/event.model';
import { Ticket } from '../../models/ticket.model';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { finalize } from 'rxjs/operators'; // Import finalize operator

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

  loadingEvents = true; // State to track if events are loading
  loadingTickets = true; // State to track if tickets are loading

  ngOnInit() {
    this.loadEvents();
    this.loadTickets();
  }

  loadEvents() {
    this.loadingEvents = true; // Set loading to true before fetching
    this.eventService.getEvents().pipe(
      finalize(() => this.loadingEvents = false) // Set loading to false when observable completes
    ).subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        // Optionally show an error message on the UI
      }
    });
  }

  loadTickets() {
    this.loadingTickets = true; // Set loading to true before fetching
    this.ticketService.getAllTickets().pipe(
       finalize(() => this.loadingTickets = false) // Set loading to false when observable completes
    ).subscribe({
       next: (tickets) => {
        this.tickets = tickets;
       },
       error: (err) => {
         console.error('Error fetching tickets:', err);
         // Optionally show an error message on the UI
       }
    });
  }


  deleteEvent(event_id: string) {
    if (confirm('Are you sure you want to delete this event?')) {
      // Optionally show a loading indicator specifically for the delete operation
      this.eventService.deleteEvent(event_id).subscribe({
        next: () => {
           this.events = this.events.filter(e => e.id !== event_id);
        },
        error: (err) => {
          console.error('Error deleting event:', err);
          // Optionally show an error message
        }
      });
    }
  }

  cancelTicket(ticketId: string) {
    if (confirm('Are you sure you want to cancel this ticket?')) {
       // Optionally show a loading indicator specifically for the cancel operation
      this.ticketService.cancelTicket(ticketId).subscribe({
        next: (ticket) => {
          const index = this.tickets.findIndex(t => t.id === ticketId);
          if (index !== -1) {
            // Update the ticket status in the local array
            this.tickets[index] = ticket;
          }
        },
        error: (err) => {
          console.error('Error cancelling ticket:', err);
           // Optionally show an error message
        }
      });
    }
  }
}
