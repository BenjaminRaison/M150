import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../service/login.service";
import {UserService} from "../../service/user.service";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['username', 'email', 'rights'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private users: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>(this.users);

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.userService.getAllUsers().subscribe(value => {
      this.users = value;
      this.dataSource.data = this.users;
    }, () => {
      this.router.navigateByUrl('/home');
    });
  }
}
