import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports:[ReactiveFormsModule,NgIf],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {
  userDetailsForm: FormGroup;
  placeholders: any = {};
  isEditing: boolean = false;
  dropdownOpen: boolean = false;
  isModalOpen: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private titleService: Title
  ) {
    this.titleService.setTitle("User Profile");
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
      .get('http://localhost:8080/auth/user/userProfile', { withCredentials: true })
      .subscribe((response: any) => {
        console.log(response);
        this.placeholders = response;
        this.userDetailsForm.patchValue(response);
        this.userDetailsForm.disable();  // Start in read-only mode
      });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  openEditModal(): void {
    this.isModalOpen = true;
    this.isEditing = true;
    this.userDetailsForm.enable();  // Enable form for editing
  }

  closeEditModal(): void {
    this.isModalOpen = false;
    this.isEditing = false;
    this.userDetailsForm.disable();  // Disable form to make it read-only
  }

  saveDetails(): void {
    if (this.userDetailsForm.valid) {
      this.http
        .post('http://localhost:8080/auth/user/update/userProfile', this.userDetailsForm.value, { withCredentials: true })
        .subscribe({
          next: () => {
            this.toastr.success('Details updated successfully!', 'Success');
            this.isModalOpen = false;
            this.placeholders = this.userDetailsForm.value;  // Update placeholders with new values
            this.userDetailsForm.disable();  // Disable form again to make it read-only
          },
          error: () => {
            this.toastr.error('Failed to update details.', 'Error');
          }
        });
    } else {
      this.toastr.error('Please correct the errors before saving.', 'Error');
    }
  }
}
