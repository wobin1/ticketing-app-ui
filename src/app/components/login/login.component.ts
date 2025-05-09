import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { InputComponent } from '../../shared/ui/input/input.component';
import { ModalComponent } from '../../shared/ui/modal/modal.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent, ModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Input() showLoginModal!:boolean;
  @Input() showForm!:boolean;
  @Input() isLoginFromPage:boolean = false;

  authService = inject(AuthService);
  router = inject(Router);
  isLoading = false;


  loginForm = { username: '', password: '' };

  login() {
    this.isLoading = true;
    this.authService.login(this.loginForm.username, this.loginForm.password).subscribe({
      next: () => {
        this.showLoginModal = false;
        this.showForm = true;
        this.isLoading = false;
        if(this.isLoginFromPage){
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        this.isLoading = false;
        alert('Login failed');
      }
    });
  }


}
