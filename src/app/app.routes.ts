import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ProfileComponent } from './user-details/profile/profile.component';
import { AddressBookComponent } from './user-details/address-book/address-book.component';
import { ManageAccountComponent } from './user-details/manage-account/manage-account.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegistrationComponent},
    {path:'user-details',component:UserDetailsComponent,
        children:[
            {path:'profile',component:ProfileComponent},
            {path:'address-book',component:AddressBookComponent},
            {path:'manage-account',component:ManageAccountComponent},
            {path:'',redirectTo:'profile',pathMatch:'full'}
        ]
    }

];
