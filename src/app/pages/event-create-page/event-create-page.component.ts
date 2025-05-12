import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-create-page',
  standalone: true,
  imports: [CommonModule, EventFormComponent],
  templateUrl: './event-create-page.component.html',
  styleUrl: './event-create-page.component.scss'
})
export class EventCreatePageComponent {
  eventService = inject(EventService);
  router = inject(Router);
  isLoading = false;

  createEvent(eventData: Partial<Event>) {
    this.isLoading = true;
    this.eventService.createEvent(eventData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        this.isLoading = false;
        alert(`Error: ${error.message || 'Failed to create event'}`);
      }
    });
  }

  cancel() {
    this.router.navigate(['/admin']);
  }

}
