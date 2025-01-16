import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registrationForm = this.fb.group(
      {
        firstName: ['', [Validators.pattern('^[a-zA-Z]+$')]],
        lastName: ['', [Validators.pattern('^[a-zA-Z]+$')]],
        mobile: ['', [Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: this.passwordMatchValidator(),
      }
    );
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (password && confirmPassword && password !== confirmPassword) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  register() {
    if (this.registrationForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }
  
    const userData = this.registrationForm.value;
    delete userData.confirmPassword; 
    console.log(userData);
  
    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        alert('Registration successful!');
        this.router.navigate(['/login']);

      },
      error: (error) => {
        alert('Registration failed. Please try again.');
        //console.log(userData);
        console.error(error);
      },
      complete: () => {
        console.log('Registration process complete');
      }
    });
    
  
  }
}
