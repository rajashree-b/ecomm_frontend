import { Component } from '@angular/core';
import { UserDetailsComponent } from "../user-details/user-details.component";
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-new-home',
  standalone: true,
  imports: [UserDetailsComponent, HomeComponent],
  templateUrl: './new-home.component.html',
  styleUrl: './new-home.component.css'
})
export class NewHomeComponent {

}
