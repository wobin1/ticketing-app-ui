import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';
import { environment } from '../../environments/environment.development';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private baseUrl = `${environment.baseUrl}`;  // Remove :any type annotation

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    console.log('AuthService initialized');
    console.log('baseUrl', this.baseUrl);
    // Load user from localStorage on service init
    const user = this.storageService.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<AuthResponse> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, formData)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  register(user: { email: string; password: string; firstName?: string; lastName?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, user)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  logout(): void {
    this.storageService.removeItem('user');
    this.storageService.removeItem('token');
    this.currentUserSubject.next(null);
  }

  private handleAuthResponse(response: AuthResponse): void {
    this.storageService.setItem('user', JSON.stringify(response.user));
    this.storageService.setItem('token', response.token);
    this.currentUserSubject.next(response.user);
  }
}
