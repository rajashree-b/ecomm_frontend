// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), 
    provideHttpClient(), 
    importProvidersFrom(
      BrowserAnimationsModule, 
      ToastrModule.forRoot(
        {
        positionClass: 'toast-top-right',
        // preventDuplicates: true,
        // closeButton: true,
        timeOut: 5000,
        toastClass: 'custom-toast' 
        }
      ) // Configure Toastr globally here  
    ),       
  ],
}).catch((err) => console.error(err));
