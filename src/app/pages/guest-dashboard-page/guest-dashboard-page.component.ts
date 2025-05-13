import { Component } from '@angular/core';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-guest-dashboard-page',
  imports: [UserDashboardComponent],
  templateUrl: './guest-dashboard-page.component.html',
  styleUrl: './guest-dashboard-page.component.scss'
})
export class GuestDashboardPageComponent {

}
