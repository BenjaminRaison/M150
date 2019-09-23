import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameFormControl: FormControl = new FormControl('', [Validators.required]);
  passwordFormControl: FormControl = new FormControl('', [Validators.required]);

  loginFormGroup: FormGroup = new FormGroup({
    username: this.usernameFormControl,
    password: this.passwordFormControl
  });
  formSubmitted: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  doLogin() {
    this.formSubmitted = true;
    this.loginService.authenticate({
      username: this.loginFormGroup.value.username,
      password: this.loginFormGroup.value.password
    }).subscribe(value => this.router.navigateByUrl('/'));
  }
}
