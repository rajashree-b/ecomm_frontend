import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, public router: Router, private http: HttpClient,private toastr:ToastrService,private titleService: Title) {
    this.titleService.setTitle('Login');

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.http.post(('http://localhost:8080/auth/generateToken'), { email, password },{withCredentials : true,responseType:'text'}).subscribe({
      next: () => {
        // alert('Login successful!');
        this.toastr.success('Login successful!','Success');
        this.router.navigate(['/user-details']);
      },
      error: () => {
        this.toastr.error('Invalid credentials.Please try again','Error');
      }
    });
  }
}
