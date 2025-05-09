import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { InputComponent } from '../../shared/ui/input/input.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent, ModalComponent,],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @Input() showRegisterModal!: boolean;
  @Input() showForm!: boolean;

  authService = inject(AuthService);
  router = inject(Router);
  isLoading = false;
  registerForm = { email: '', firstName: '', lastName: '', password: '', confirmPassword: '' };

  register() {
    this.isLoading = true;
    this.authService.register(this.registerForm).subscribe({
      next: () => {
        this.showRegisterModal = false;
        this.showForm = true;
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.isLoading = false;
        alert('Registration failed');
      }
    });
  }


}
