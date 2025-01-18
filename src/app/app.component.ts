import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AuthLoggingInterceptor } from './interceptors/auth-logging.interceptor';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthLoggingInterceptor,
  //     multi: true
  //   },
  // ],
})
export class AppComponent {
  title = 'ecom_ui';
}
