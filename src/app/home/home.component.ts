import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from "../user-details/profile/profile.component";
import { AddressBookComponent } from "../user-details/address-book/address-book.component";
import { ManageAccountComponent } from "../user-details/manage-account/manage-account.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfileComponent, AddressBookComponent, ManageAccountComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentComponent = '';
  constructor(public router:Router)
  {
      
  }
   showMenu=false;
  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  logout(): void {
    console.log('Logged out successfully');
  }

  showComponent(component: string) {
    this.currentComponent = component;
  }

  isActive(component: string): boolean {
    return this.currentComponent === component;
  }

  toggleMenu(){
    this.showMenu=!this.showMenu;

  }

}
