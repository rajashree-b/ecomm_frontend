
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthLoggingInterceptor } from '../interceptors/auth-logging.interceptor';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthLoggingInterceptor,
      multi: true
    },
  ]
})
export class UserDetailsComponent implements OnInit {
  userDetailsForm: FormGroup;
  placeholders: any = {};

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.userDetailsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      userName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.http
      .get('http://localhost:8080/auth/user/userProfile', { withCredentials : true, responseType : "text" })
      .subscribe(response => {
        try{
          const jsonResponse = JSON.parse(response);
          console.log(jsonResponse);
          this.placeholders = jsonResponse; 
          this.userDetailsForm.patchValue(jsonResponse);
        }catch(e){
          console.log(response);
        }
      });
  }

  saveDetails(): any {
    if (this.userDetailsForm.valid) {
      // Send updated details to POST API
      this.http
        .post(
          'http://localhost:8080/auth/user/update/userProfile',
          this.userDetailsForm.value,
          { withCredentials: true , responseType : "text" },
        )
        .subscribe({
          next: () => {
            alert('Details updated successfully!');
            this.router.navigate(['/']); // Navigate to home or login page
          }
        });
    } else {
      alert('Please correct the errors before saving.');
    }
  }
}

