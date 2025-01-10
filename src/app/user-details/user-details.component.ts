
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userDetailsForm: FormGroup;
  placeholders: any = {};

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private apiService: ApiserviceService
  ) {
    this.userDetailsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      username: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.http
      .get('http://localhost:8080/auth/user/userProfile', this.apiService.addAuth())
      .subscribe({
        next: (data) => {
          this.placeholders = data; 
          this.userDetailsForm.patchValue(data); 
        },
        error: (error) => {
          console.error('Error fetching user details:', error.message);  
          alert('Failed to fetch user details: ' + error.message);  
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
          this.apiService.addAuth()
        )
        .subscribe({
          next: () => {
            alert('Details updated successfully!');
            this.router.navigate(['/']); // Navigate to home or login page
          },
          error: () => alert('Failed to update details. Please try again.'),
        });
    } else {
      alert('Please correct the errors before saving.');
    }
  }
}

