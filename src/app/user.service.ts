import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/users');
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/users/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post('http://localhost:3000/users', user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`http://localhost:3000/users/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/users/${id}`);
  }
}
