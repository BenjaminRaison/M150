import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticationSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
  }

  authenticate(credentials: Credentials): Observable<any> {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});
    return this.http.get(`${environment.backendUrl}user`, {headers: headers})
      .pipe(map((value: any) => {
        this.authenticationSubject.next({
          username: value.name,
          roles: [value.authorities[0].right]
        });
      }));
  }

  testAuthentication(): Observable<any> {
    return this.http.get(`${environment.backendUrl}user`)
      .pipe(map((value: any) => {
        this.authenticationSubject.next({
          username: value.name,
          roles: [value.authorities[0].right]
        });
      }));
  }
}

export class Credentials {
  username: string;
  password: string;
}

export class User {
  username: string;
  roles: string[]
}
