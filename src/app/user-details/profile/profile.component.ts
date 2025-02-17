import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userDetailsForm: FormGroup;
  placeholders: any = {};
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private titleService: Title
  ) {
    this.titleService.setTitle('User Profile');

    this.userDetailsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      userName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.http
      .get('http://localhost:8080/user/userProfile', {
        withCredentials: true,
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          try {
            const jsonResponse = JSON.parse(response);
            console.log('User Profile:', jsonResponse);

            this.placeholders = jsonResponse;
            this.userDetailsForm.patchValue(jsonResponse);
            this.userDetailsForm.disable(); 
          } catch (e) {
            console.error('Error parsing response:', e);
            this.toastr.error('Failed to process user data.', 'Error');
          }
        },
        error: (err) => {
          console.error('API Error:', err);
          this.toastr.error('Failed to fetch user profile.', 'Error');
        },
      });
  }

  toggleEdit(): void {
    this.isEditing = true;
    this.userDetailsForm.enable();

    }
   cancelEdit(): void {
    this.isEditing = false;
    this.userDetailsForm.patchValue(this.placeholders); 
    this.userDetailsForm.disable();
  }

  saveDetails(): void {
    if (this.userDetailsForm.valid) {
      this.http
        .put(
          'http://localhost:8080/user/userProfile',
          this.userDetailsForm.value,
          {
            withCredentials: true,
            responseType: 'text',
          }
        )
        .subscribe({
          next: () => {
            this.toastr.success('Details updated successfully!', 'Success');
            console.log("updated successfully")
            this.isEditing = false;

            this.placeholders = this.userDetailsForm.value;
            this.userDetailsForm.disable(); 
          },
          error: (err) => {
            console.error('API Error:', err);
            this.toastr.error('Failed to update details.', 'Error');
          },
        });
    } else {
      this.toastr.error('Please correct the errors before saving.', 'Error');
    }
  }
}
