import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, UserDashboardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

}
