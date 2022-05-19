import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {User} from './model/user';
import {environment} from '../environments/environment';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(user): Observable<User> {
    return this.http.post<User>(`${API_URL}/login`, user);
  }

  register(signUpForm): Observable<User> {
    return this.http.post<User>(`${API_URL}/register`, signUpForm);
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users`);
  }

  changePassword(changePasswordForm): Observable<User> {
    return this.http.put<User>(`${API_URL}/changePassword`, changePasswordForm);
  }
}