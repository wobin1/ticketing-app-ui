import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestDashboardPageComponent } from './guest-dashboard-page.component';

describe('GuestDashboardPageComponent', () => {
  let component: GuestDashboardPageComponent;
  let fixture: ComponentFixture<GuestDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestDashboardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
