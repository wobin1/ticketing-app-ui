import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { EventListComponent } from '../../components/event-list/event-list.component';
import { Event } from '../../models/event.model';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/ui/input/input.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, EventListComponent, FormsModule, InputComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  eventService = inject(EventService);
  events: Event[] = [];
  searchQuery = '';

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  searchEvents() {
    if (this.searchQuery.trim()) {
      this.eventService.searchEvents(this.searchQuery).subscribe(events => {
        this.events = events;
      });
    } else {
      this.eventService.getEvents().subscribe(events => {
        this.events = events;
      });
    }
  }

}
