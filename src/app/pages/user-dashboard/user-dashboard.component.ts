import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/tickets.service';
import { Ticket } from '../../models/ticket.model';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ModalComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  ticketService = inject(TicketService);
  tickets: Ticket[] = [];
  showQrModal = false;
  selectedTicket: Ticket | null = null;

  ngOnInit() {
    this.ticketService.getUserTickets().subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  openQrModal(ticket: Ticket) {
    this.selectedTicket = ticket;
    this.showQrModal = true;
  }


}
