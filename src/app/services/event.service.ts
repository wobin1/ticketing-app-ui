import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Event } from '../models/event.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);
  private baseUrl:any = `${environment.baseUrl}/events`;

  mockData:any = [
    {
      id: 'evt_001',
      name: 'Summer Music Festival',
      description: 'Join us for a day of live music featuring top artists across genres. Food trucks and family-friendly activities included!',
      date: new Date('2025-07-12T12:00:00Z'),
      time: '12:00 PM',
      location: 'Central Park, New York, NY',
      imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
      ticketTypes: [
        {
          id: 'tt_001_1',
          name: 'General Admission',
          description: 'Access to all festival areas except VIP zones.',
          price: 75.00,
          available: 500
        },
        {
          id: 'tt_001_2',
          name: 'VIP Pass',
          description: 'Includes exclusive lounge access and premium viewing areas.',
          price: 150.00,
          available: 100
        }
      ]
    },
    {
      id: 'evt_002',
      name: 'Tech Conference 2025',
      description: 'Explore the latest in AI, cloud computing, and cybersecurity with industry leaders and hands-on workshops.',
      date: new Date('2025-09-15T09:00:00Z'),
      time: '9:00 AM',
      location: 'Moscone Center, San Francisco, CA',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
      ticketTypes: [
        {
          id: 'tt_002_1',
          name: 'Standard Ticket',
          description: 'Access to all keynotes and breakout sessions.',
          price: 299.00,
          available: 1000
        },
        {
          id: 'tt_002_2',
          name: 'Premium Ticket',
          description: 'Includes workshop access and priority seating.',
          price: 499.00,
          available: 200
        }
      ]
    },
    {
      id: 'evt_003',
      name: 'Comedy Night Live',
      description: 'Laugh out loud with top comedians from across the country in an intimate venue.',
      date: new Date('2025-06-20T20:00:00Z'),
      time: '8:00 PM',
      location: 'The Laugh Factory, Chicago, IL',
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
      ticketTypes: [
        {
          id: 'tt_003_1',
          name: 'Standard Seat',
          description: 'General seating in the main auditorium.',
          price: 35.00,
          available: 200
        },
        {
          id: 'tt_003_2',
          name: 'Front Row',
          description: 'Prime front-row seating for the best experience.',
          price: 65.00,
          available: 20
        }
      ]
    },
    {
      id: 'evt_004',
      name: 'Art & Wine Festival',
      description: 'Celebrate local artists and wineries with live music, tastings, and art exhibitions.',
      date: new Date('2025-08-03T11:00:00Z'),
      time: '11:00 AM',
      location: 'Napa Valley, CA',
      imageUrl: 'https://images.unsplash.com/photo-1515169067868-5387ec356754',
      ticketTypes: [
        {
          id: 'tt_004_1',
          name: 'General Entry',
          description: 'Access to all festival areas and exhibitions.',
          price: 50.00,
          available: 300
        },
        {
          id: 'tt_004_2',
          name: 'Tasting Pass',
          description: 'Includes wine tasting sessions with local vintners.',
          price: 85.00,
          available: 150
        }
      ]
    },
    {
      id: 'evt_005',
      name: 'Marathon 2025',
      description: 'Run through the city in this annual marathon event, with options for full, half, and 5K races.',
      date: new Date('2025-10-05T07:00:00Z'),
      time: '7:00 AM',
      location: 'Boston, MA',
      imageUrl: 'https://images.unsplash.com/photo-1552673469-8a267f7b6e7e',
      ticketTypes: [
        {
          id: 'tt_005_1',
          name: '5K Race',
          description: 'Participate in the 5K fun run.',
          price: 30.00,
          available: 500
        },
        {
          id: 'tt_005_2',
          name: 'Half Marathon',
          description: 'Run the half marathon course.',
          price: 75.00,
          available: 300
        },
        {
          id: 'tt_005_3',
          name: 'Full Marathon',
          description: 'Challenge yourself with the full marathon.',
          price: 120.00,
          available: 200
        }
      ]
    }
  ];

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
    // return of(this.mockData);
  }

  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
    // const event = this.mockData.find((e: { id: any; }) => e.id === id);
    // return of(event!);
  }

  searchEvents(query: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/search`, { params: { query } });
    // const filteredEvents = this.mockData.filter((event: Event) =>
    //   event.name.toLowerCase().includes(query.toLowerCase()) ||
    //   event.description.toLowerCase().includes(query.toLowerCase())
    // );
    // return of(filteredEvents);
  }


  createEvent(event: Partial<Event>): Observable<Event> {
    return this.http.post<Event>(this.baseUrl, event);
    // const newEvent = {
    //   id: `evt_${Date.now()}`,
    //   ...event
    // } as Event;
    // this.mockData.push(newEvent);
    // return of(newEvent);
  }

  updateEvent(id: string, event: Partial<Event>): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/${id}`, event);
    // const index = this.mockData.findIndex((e: Event) => e.id === id);
    // if (index !== -1) {
    //   this.mockData[index] = { ...this.mockData[index], ...event };
    //   return of(this.mockData[index]);
    // }
    // throw new Error('Event not found');
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
    // const index = this.mockData.findIndex((e: Event) => e.id === id);
    // if (index !== -1) {
    //   this.mockData.splice(index, 1);
    //   return of(void 0);
    // }
    // throw new Error('Event not found');
  }
}

