import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http: HttpClient) {}

  addAuth() {
    const token = this.getCookie('JWT');  
  
    if (token) {
      console.log('JWT Token found:', token);  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return { headers, withCredentials: true };
    }
  
    console.log('No JWT Token found');
    return { withCredentials: true };
  }
  

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
}
