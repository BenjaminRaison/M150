import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "./login.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get(environment.backendUrl + '/users').pipe(
      map((value: any) => value._embedded.users)
    );
  }

  getUserByUrl(url: string): Observable<User> {
    return this.http.get<User>(url);
  }

  getUserByUsername(name: string): Observable<User> {
    return this.http.get<User>(`${environment.backendUrl}/users/search/findByUsername?username=${name}`);
  }
}
