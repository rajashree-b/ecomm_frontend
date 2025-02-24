import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from "./profile/profile.component";
import { AddressBookComponent } from "./address-book/address-book.component";
import { ManageAccountComponent } from "./manage-account/manage-account.component";
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ProfileComponent, AddressBookComponent, ManageAccountComponent, NgIf],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})

export class UserDetailsComponent{


  currentComponent: string = 'profile'; 

  constructor(private http: HttpClient,private router:Router,private toastr:ToastrService){

  }


  logout(){
    this.http.get('http://localhost:8080/auth/logout', { withCredentials: true,responseType:'text' }).subscribe({
      next: () => {
        console.log('Logout successful');
        this.router.navigate(['/login']);
        this.toastr.success('Logout successful!','Success');

      },
      error: (err) => {
        console.error('Logout failed', err);
        this.toastr.error('Unable to logout','Error');
      }
    });

  }
  
  showComponent(componentName: string) {
    this.currentComponent = componentName;  

  }


  isActive(component: string): boolean {
    return this.currentComponent === component;
  }




}
