import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common'; // Import NgClass
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgClass], // Add NgClass here
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  isMobileMenuOpen = false; // State to control mobile menu visibility

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Navigate to home after logout
    window.location.reload();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Optional: Close mobile menu when a route changes
  // You can uncomment and implement this if needed
  // constructor() {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       this.isMobileMenuOpen = false;
  //     }
  //   });
  // }
}
