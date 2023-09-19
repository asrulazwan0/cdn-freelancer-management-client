import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = `${environment.apiURL}/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiURL);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiURL, user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
