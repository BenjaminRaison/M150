import {Component, OnInit} from '@angular/core';
import {LoginService, User} from "./service/login.service";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: Subject<User>;

  constructor(private loginService: LoginService, private router: Router) {
    this.user = loginService.authenticationSubject;
  }

  ngOnInit(): void {
    this.loginService.testAuthentication().subscribe(value => {
    }, error => {
      if (this.router.url !== '/login') {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
