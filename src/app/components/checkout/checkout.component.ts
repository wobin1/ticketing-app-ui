import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TicketService } from '../../services/tickets.service';
import { StorageService } from '../../services/storage.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { InputComponent } from '../../shared/ui/input/input.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent, ModalComponent, LoginComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  @Input() purchaseData: any;

  authService = inject(AuthService);
  ticketService = inject(TicketService);
  storageService = inject(StorageService);
  router = inject(Router);

  showForm = false;
  showLoginModal = false;
  showRegisterModal = false;
  isLoading = false;

  registerForm = { email: '', firstName: '', lastName: '', password: '', confirmPassword: '' };
  billing = { cardholderName: '', cardNumber: '', expiry: '', cvv: '' };

  get isFormValid(): boolean {
    return !!this.billing.cardholderName && !!this.billing.cardNumber && !!this.billing.expiry && !!this.billing.cvv;
  }



  continueAsGuest() {
    this.showForm = true;
  }



  register() {
    this.isLoading = true;
    this.authService.register(this.registerForm).subscribe({
      next: () => {
        this.showRegisterModal = false;
        this.showForm = true;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        alert('Registration failed');
      }
    });
  }

  submitPurchase() {
    this.isLoading = true;
    this.ticketService.purchaseTickets(this.purchaseData).subscribe({
      next: (tickets) => {
        if (!this.authService.isLoggedIn) {
          tickets.forEach(ticket => {
            this.storageService.storeGuestTicket({
              id: ticket.id,
              event_id: ticket.event_id,
              ticket_type_id: ticket.ticket_type_id,
              qr_code: ticket.qr_code,
              attendee_name: ticket.attendee_name,
              attendee_email: ticket.attendee_email
            });
          });
        }
        this.isLoading = false;
        this.router.navigate(['/confirmation'], { state: { tickets } });
      },
      error: () => {
        this.isLoading = false;
        alert('Purchase failed');
      }
    });
  }

}
