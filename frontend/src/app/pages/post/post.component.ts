import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Post, PostService} from "../../service/post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: Observable<Post>;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.post = this.postService.getPostById(Number(id));
    } else {
      this.router.navigateByUrl('/home');
    }
  }

}
