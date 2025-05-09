import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Event, TicketType } from '../../models/event.model';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { InputComponent } from '../../shared/ui/input/input.component';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, InputComponent],  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss'
})
export class EventFormComponent {
  @Input() event: Event | null = null;
  @Input() isLoading = false;
  @Output() submit = new EventEmitter<Partial<Event>>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  eventForm: FormGroup;
  isEditMode = false;

  constructor() {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      location: ['', Validators.required],
      image_url: ['', Validators.required],
      ticket_types: this.fb.array([])  // Changed from ticketTypes to ticket_types
    });

    if (this.event) {
      this.isEditMode = true;
      this.eventForm.patchValue({
        name: this.event.name,
        description: this.event.description,
        date: this.event.date.toISOString().split('T')[0],
        time: this.event.time,
        location: this.event.location,
        image_url: this.event.image_url
      });
      this.event.ticket_types.forEach((ticketTypes: TicketType | undefined) => {
        this.addTicketType(ticketTypes);
      });
    }
  }

  get ticketTypes(): FormArray {
    return this.eventForm.get('ticket_types') as FormArray;  // Changed from ticketTypes to ticket_types
  }

  addTicketType(ticketType?: TicketType) {
    const ticketTypeGroup = this.fb.group({
      id: [ticketType?.id || `tt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`],
      name: [ticketType?.name || '', Validators.required],
      description: [ticketType?.description || '', Validators.required],
      price: [ticketType?.price || 0, [Validators.required, Validators.min(0)]],
      available: [ticketType?.available || 0, [Validators.required, Validators.min(0)]]
    });
    this.ticketTypes.push(ticketTypeGroup);
  }

  removeTicketType(index: number) {
    this.ticketTypes.removeAt(index);
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const eventData: Partial<Event> = {
        ...formValue,
        date: new Date(formValue.date),
        ticket_types: formValue.ticket_types.map((tt: any) => ({  // Changed from ticketTypes
          id: tt.id,
          name: tt.name,
          description: tt.description,
          price: Number(tt.price),
          available: Number(tt.available)
        }))
      };
      this.submit.emit(eventData);
    }
  }

}
