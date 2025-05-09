import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { Event } from '../../models/event.model';


@Component({
  selector: 'app-event-edit-page',
  standalone: true,
  imports: [CommonModule, EventFormComponent],  templateUrl: './event-edit-page.component.html',
  styleUrl: './event-edit-page.component.scss'
})
export class EventEditPageComponent {
  eventService = inject(EventService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  event: Event | null = null;
  isLoading = false;

  ngOnInit() {
    const event_id = this.route.snapshot.paramMap.get('id');
    if (event_id) {
      this.eventService.getEvent(event_id).subscribe(event => {
        this.event = event;
      });
    }
  }

  updateEvent(eventData: Partial<Event>) {
    const event_id = this.route.snapshot.paramMap.get('id');
    if (event_id) {
      this.isLoading = true;
      this.eventService.updateEvent(event_id, eventData).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/admin']);
        },
        error: () => {
          this.isLoading = false;
          alert('Failed to update event');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin']);
  }

}
