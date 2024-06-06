import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userApiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUserByUsername(userName: string): Observable<User[]>{
    console.log(this.userApiUrl + '?userName=' + userName);
    return this.http.get<User[]>(this.userApiUrl + '?userName=' + userName);   
    
  }

  userReg(data: User) {
    return this.http.post(this.userApiUrl, data);
  }
}
