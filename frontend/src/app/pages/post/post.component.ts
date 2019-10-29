import {Component, OnInit} from '@angular/core';
import {Post, PostService} from "../../service/post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: Post;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) {
      this.postService.getPostById(Number(id)).subscribe(
        value => this.post = value,
        () => this.router.navigateByUrl('/home')
      );
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}
