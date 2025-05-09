import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from '../../components/admin-dashboard/admin-dashboard.component';
@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [CommonModule, AdminDashboardComponent],
  templateUrl: './admin-dashboard-page.component.html',
  styleUrl: './admin-dashboard-page.component.scss'
})
export class AdminDashboardPageComponent {

}
