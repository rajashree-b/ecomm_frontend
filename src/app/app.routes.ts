import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ProfileComponent } from './user-details/profile/profile.component';
import { AddressBookComponent } from './user-details/address-book/address-book.component';
import { ManageAccountComponent } from './user-details/manage-account/manage-account.component';
import { NewHomeComponent } from './new-home/new-home.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
        { path: 'profile', component: ProfileComponent },
        { path: 'address-book', component: AddressBookComponent },
        { path: 'manage-account', component: ManageAccountComponent },
    { path: 'login', component: LoginComponent },
    // { path: '**', redirectTo: 'home' } 
    { path: 'home', component: HomeComponent},
    {path:'new-home',component:NewHomeComponent}
  ];


