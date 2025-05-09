import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/ui/button/button.component';


@Component({
  selector: 'app-confirmation-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink],
  templateUrl: './confirmation-page.component.html',
  styleUrl: './confirmation-page.component.scss'
})
export class ConfirmationPageComponent {
  storageService = inject(StorageService);
  router = inject(Router);
  isGuest = false;

  ngOnInit() {
    const tickets = history.state.tickets || [];
    if (tickets.length > 0 && !this.storageService.getItem('user')) {
      this.isGuest = true;
      tickets.forEach((ticket: any) => {
        this.storageService.clearGuestTicket(ticket.id);
      });
    }
  }

}
