import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../service/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input()
  posts: Post[];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  openPost(id: number) {
    this.router.navigateByUrl(`/post/${id}`)
  }
}
