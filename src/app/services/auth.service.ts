import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://09fb-138-204-25-173.ngrok-free.app/mmparking/login';

  constructor(private http: HttpClient) {}

  login(credentials: { login: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }
}
