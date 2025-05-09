import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Event, TicketType } from '../../models/event.model'; // Assuming your models are correct
import { ButtonComponent } from '../../shared/ui/button/button.component'; // Assuming app-button is ButtonComponent
import { InputComponent } from '../../shared/ui/input/input.component'; // Assuming app-input is InputComponent

@Component({
  selector: 'app-ticket-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent], // Ensure ButtonComponent and InputComponent are correctly imported
  templateUrl: './ticket-selection.component.html',
  styleUrl: './ticket-selection.component.scss'
})
export class TicketSelectionComponent implements OnChanges {
  @Input() event!: Event;
  @Output() onCheckout = new EventEmitter<any>(); // This emitter should only trigger on button click

  quantities: { [key: string]: number } = {};
  attendees: { [key: string]: { name: string; email: string }[] } = {};
  hasSelection = false; // Indicates if ANY quantity > 0



  // Use ngOnChanges to react to the Input 'event' data changing
  ngOnChanges(changes: SimpleChanges): void {
    // Check if the 'event' input has changed and is now a non-null value
    if (changes['event'] && changes['event'].currentValue) {
      const currentEvent = changes['event'].currentValue as Event;
      console.log('Event data received in TicketSelectionComponent:', currentEvent);
      this.event = currentEvent; // Update the local event reference

      // Reset quantities and attendees for the new event data
      this.quantities = {}; // Reset quantities for the new event
      this.attendees = {}; // Reset attendees for the new event

      currentEvent.ticket_types?.forEach(type => {
        // Initialize quantities to 0 for each ticket type
        this.quantities[type.id] = 0;
        // Initialize attendees arrays (even if empty initially)
        this.attendees[type.id] = [];
      });

      // Update the selection state based on initial quantities (which are all 0)
      this.updateSelectionState();

      // Do NOT emit onCheckout here!
    }
  }

  // Helper method to get the attendee array for a specific ticket type
  getAttendeesArray(ticket_type_id: string): { name: string; email: string }[] {
    const count = this.quantities[ticket_type_id] || 0;

    // Ensure the attendees array exists for this ticket type before manipulating
    if (!this.attendees[ticket_type_id]) {
      this.attendees[ticket_type_id] = [];
    }

    // Grow the array if needed (e.g., user increases quantity)
    while (this.attendees[ticket_type_id].length < count) {
      this.attendees[ticket_type_id].push({ name: '', email: '' });
    }

    // Trim the array if the quantity decreased
    this.attendees[ticket_type_id].splice(count);

    // We need to return the array that ngModel can bind to directly.
    // If you need a copy for some reason, slice here, but direct reference is common.
    return this.attendees[ticket_type_id];

     // REMOVED: this.updateSelection(); <--- Incorrect call that caused the issue
  }

  // New method to just update the component's selection state (like hasSelection)
  updateSelectionState(): void {
     // Add checks to ensure event and ticketTypes are available before processing
     if (!this.event || !this.event.ticket_types) {
         this.hasSelection = false; // No event data means no selection
         return; // Stop processing
     }

    // Check if there's any ticket type with a quantity > 0
    // This determines if the "Proceed to Checkout" button should be enabled
    this.hasSelection = this.event.ticket_types.some(type => this.quantities[type.id] > 0);

     // Do NOT emit onCheckout here!
  }

  // This method is called by the (ngModelChange) and input changes
  handleInputChange(): void {
      this.updateSelectionState(); // Only update the state when an input changes
      // Do NOT emit onCheckout here!
  }


  // This method is called when the "Proceed to Checkout" button is clicked
  proceedToCheckout(): void {
    // Ensure the latest state is calculated before proceeding
    this.updateSelectionState();

     // Only proceed and emit if there is a valid selection
    if (this.hasSelection) {
        // Build the final selection data structure to emit
        const selectionData = this.event.ticket_types
          .filter(type => this.quantities[type.id] > 0) // Filter for ticket types with quantity > 0
          .map(type => ({
            ticket_type_id: type.id,
            quantity: this.quantities[type.id],
            // Ensure attendees array exists before slicing
            attendees: (this.attendees[type.id] || []).slice(0, this.quantities[type.id]) // Get attendee data for selected quantity
          }));

        // Emit the checkout data. This is the ONLY place onCheckout should be emitted.
        console.log('Proceeding to checkout with selection:', selectionData);
        this.onCheckout.emit({ event_id: this.event.id, tickets: selectionData });
    } else {
        console.warn('Proceed to checkout called with no selection.');
        // The button should be disabled if hasSelection is false, but this is a safeguard.
        // Optionally show a message to the user if this somehow gets called when disabled.
    }
  }

  // Optional: Implement ngOnDestroy to clean up subscriptions if you had any
  // ngOnDestroy(): void {
  //   // Unsubscribe here if needed
  // }
}
