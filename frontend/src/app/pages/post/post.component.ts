import {Component, OnInit} from '@angular/core';
import {Post, PostService} from "../../service/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Comment, CommentService} from "../../service/comment.service";
import {Observable} from "rxjs";
import {CommentDialogComponent} from "../../shared/comment-dialog/comment-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: Post;
  comments: Observable<Comment[]>;

  constructor(private postService: PostService, private commentService: CommentService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(Number(id))) {
      this.postService.getPostById(Number(id)).subscribe(
        value => {
          this.post = value;
          this.loadComments();
        },
        () => this.router.navigateByUrl('/home')
      );

    } else {
      this.router.navigateByUrl('/home');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '400px',
      data: {parentComment: null, post: this.post}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadComments();
      }
    });
  }


  loadComments() {
    this.comments = this.commentService.getCommentsByPost(this.post.id);
  }
}
