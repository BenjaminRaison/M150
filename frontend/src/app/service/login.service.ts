import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {UserService} from "./user.service";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticationSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private userService: UserService) {
  }

  authenticate(credentials: Credentials): Observable<any> {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password),
    } : {});
    return this.doLoginRequest(headers);
  }

  testAuthentication(): Observable<any> {
    return this.doLoginRequest(new HttpHeaders({}));
  }

  private doLoginRequest(headers: HttpHeaders): Observable<any> {
    headers = headers.append('X-Requested-With', 'XMLHttpRequest');
    console.info(headers);
    return this.http.get(`${environment.backendUrl}/user`, {headers: headers})
      .pipe(switchMap((value: any) => {
        return this.userService.getUserByUsername(value.name).pipe(
          map(user => {
              this.authenticationSubject.next(user);
            }
          ));
      }));
  }
}

export class Credentials {
  username: string;
  password: string;
}

export class User {
  username: string;
  email?: string;
  rights: {
    right: string;
    authority: string;
  }[];
  _links?: {
    self?: {
      href: string;
    }
  }
}
