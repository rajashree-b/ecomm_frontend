import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css'],
})
export class AddressBookComponent implements OnInit {
  isEditing: boolean = false;
  isLoading: boolean = true;
  placeholders: any = {
    addressExists: false,
    id: null,
    userId: null,
    addressLine1: '',
    addressLine2: '',
    city: '',
    zipcode: null,
    state: '',
    country: '',
    contact: '',
    countryCode: '',
    isDefault: false,
  };

  addressForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) {
    this.addressForm = this.fb.group({
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
      state: [''],
      country: [''],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      countryCode: ['', Validators.required],
      isDefault: [false],
    });
  }

  ngOnInit(): void {
    this.fetchAddressDetails();
  }

  fetchAddressDetails() {
    this.http.get('http://localhost:8080/auth/user/addresses', { withCredentials: true }).subscribe({
      next: (response: any) => {
        if (response.length > 0) {
          this.placeholders = { ...response[0], addressExists: true };
          this.addressForm.patchValue(response[0]);
        } else {
          this.placeholders.addressExists = false;
        }
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to fetch address details.', 'Error');
        this.isLoading = false;
      },
    });
  }

  toggleEdit(): void {
    this.isEditing = true;
    this.addressForm.enable();
    this.addressForm.patchValue(this.placeholders);
  }

  saveDetails(): void {
    if (this.addressForm.valid) {
      const addressData = this.addressForm.value;
      const apiUrl = 'http://localhost:8080/auth/user/address';

      this.http.post(apiUrl, addressData, { withCredentials: true }).subscribe({
        next: () => {
          this.toastr.success('Address saved successfully!', 'Success');
          this.isEditing = false;
          this.fetchAddressDetails();
        
        },
        error: () => {
          this.toastr.error('Failed to save address.', 'Error');
        },
      });
    } else {
      this.toastr.error('Please fill all required fields.', 'Error');
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.addressForm.reset(this.placeholders);
  }

  removeDetails(): void {
    if (!this.placeholders.id) {
      this.toastr.error('No address to remove.', 'Error');
      return;
    }

    const apiUrl = `http://localhost:8080/auth/user/address/${this.placeholders.id}`;

    this.http.delete(apiUrl, { withCredentials: true }).subscribe({
      next: () => {
        this.placeholders = {
          addressExists: false,
          id: null,
          userId: null,
          addressLine1: '',
          addressLine2: '',
          city: '',
          zipcode: null,
          state: '',
          country: '',
          contact: '',
          countryCode: '',
          isDefault: false,
        };
        this.toastr.success('Address removed successfully!', 'Success');
        this.fetchAddressDetails();
      },
      error: () => {
        this.toastr.error('Failed to remove address.', 'Error');
      },
    });
  }
}
