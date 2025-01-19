
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr'; 
import { NgIf, CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { ToastrModule } from 'ngx-toastr'; 

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService 
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
      this.toastr.error('Please fill out the form correctly.', 'Form Error');
      return;
    }

    const userData = this.registrationForm.value;
    delete userData.confirmPassword;

    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        this.toastr.success('Registration successful!', 'Success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error('Registration failed. Please try again.', 'Error');
        console.error(error);
      },
      complete: () => {
        console.log('Registration process complete');
      }
    });
  }
}
