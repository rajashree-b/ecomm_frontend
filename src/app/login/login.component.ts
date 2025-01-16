import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.http.post(('http://localhost:8080/auth/generateToken'), { email, password },{withCredentials : true,responseType:'text'}).subscribe({
      next: () => {
        alert('Login successful!');
        this.router.navigate(['/user-details']);
      },
      error: () => {
        alert('Invalid credentials. Please try again.');
      }
    });
  }
}
