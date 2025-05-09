import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [LoginComponent, CommonModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  showLoginModal:any;
  showForm:any;
  isLoginFromPage:any;

  constructor() { }

  ngOnInit(){
    this.showForm = true;
    this.showLoginModal = true;
    this.isLoginFromPage = true;
  }



}
