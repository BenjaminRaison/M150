import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Post, PostService} from "../../service/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Observable<Post[]>;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.posts = this.postService.getAllPosts();
  }

}
