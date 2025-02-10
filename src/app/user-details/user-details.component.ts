import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from "./profile/profile.component";
import { AddressBookComponent } from "./address-book/address-book.component";
import { ManageAccountComponent } from "./manage-account/manage-account.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ProfileComponent, AddressBookComponent, ManageAccountComponent, NgIf],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})

export class UserDetailsComponent{
  currentComponent: string = 'profile'; 
  
  showComponent(componentName: string) {
    this.currentComponent = componentName;  
  }

}
