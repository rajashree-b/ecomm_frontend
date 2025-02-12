import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-address-book',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css'],
})
export class AddressBookComponent implements OnInit {
  isEditing: boolean = false;
  isLoading: boolean = true;
  addresses: any[] = [];
  selectedAddress: any = null;

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
      countryCode: [''],
      isDefault: [false],
    });
  }

  ngOnInit(): void {
    this.fetchAddressDetails();
  }

  fetchAddressDetails() {
    this.isLoading = true;
    this.http.get('http://localhost:8080/auth/user/addresses', { withCredentials: true }).subscribe({
      next: (response: any) => {
        this.addresses = response;
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Failed to fetch address details.', 'Error');
        this.isLoading = false;
      },
    });
  }

  toggleEdit(address?: any): void {
    this.isEditing = true;
    if (address) {
      this.selectedAddress = address;
      this.addressForm.patchValue(address);
    } else {
      this.selectedAddress = null;
      this.addressForm.reset();
    }
  }

  saveDetails(): void {
    if (this.addressForm.valid) {
      const addressData = this.addressForm.value;
      const apiUrl = 'http://localhost:8080/auth/user/address';

      if (this.selectedAddress) {
        
        this.http.put(apiUrl, { ...addressData, id: this.selectedAddress.id }, { withCredentials: true }).subscribe({
          next: () => {
            this.toastr.success('Address updated successfully!', 'Success');
            this.isEditing = false;
            this.fetchAddressDetails(); 
          },
          error: () => {
            this.toastr.error('Failed to update address.', 'Error');
          },
        });
      } else {
       
        this.http.post(apiUrl, addressData, { withCredentials: true }).subscribe({
          next: () => {
            this.toastr.success('Address added successfully!', 'Success');
            this.isEditing = false;
            this.fetchAddressDetails(); 
          },
          error: () => {
            this.toastr.error('Failed to add address.', 'Error');
          },
        });
      }
    } else {
      this.toastr.error('Please fill all required fields.', 'Error');
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.addressForm.reset();
  }

  removeDetails(addressId: number): void {
    const apiUrl = 'http://localhost:8080/auth/user/address';

    this.http.delete(apiUrl, { body: { id: addressId }, withCredentials: true }).subscribe({
      next: () => {
        this.toastr.success('Address removed successfully!', 'Success');
        this.fetchAddressDetails(); 
      },
      error: () => {
        this.toastr.error('Failed to remove address.', 'Error');
      },
    });
  }
}
