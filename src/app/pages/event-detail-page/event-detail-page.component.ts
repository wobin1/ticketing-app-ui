import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { TicketSelectionComponent } from '../../components/ticket-selection/ticket-selection.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-detail-page',
  standalone: true,
  imports: [CommonModule, TicketSelectionComponent],
  templateUrl: './event-detail-page.component.html',
  styleUrl: './event-detail-page.component.scss'
})
export class EventDetailPageComponent {
  eventService = inject(EventService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  event: Event | null = null;

  ngOnInit() {
    const event_id = this.route.snapshot.paramMap.get('id');
    if (event_id) {
      this.eventService.getEvent(event_id).subscribe(event => {
        this.event = event;
      });
    }
  }

  handleCheckout(data: any) {
    this.router.navigate(['/checkout'], { state: { purchaseData: data } });
  }

}
