import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service'; // Import the LocalStorageService

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  private baseUrl = 'http://localhost:3000/api'; // Your backend API URL

  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) {}
register() {
  this.http.post(`${this.baseUrl}/register`, { username: this.username, email: this.email, password: this.password })
    .subscribe(
      response => {
        // Show success message
        alert('Registration successful! Please log in.');

        // Store registration information in localStorage
        this.localStorageService.setItem('user', JSON.stringify({ username: this.username, email: this.email }));
        this.localStorageService.setItem('isRegistered', 'true'); // Flag to indicate successful registration

        // Redirect to login page
        this.router.navigate(['/login']);
      },
      error => {
        // Display error message
        alert('Registration failed. Please try again.');
        console.error('Error during registration:', error);
      }
    );
}
}
