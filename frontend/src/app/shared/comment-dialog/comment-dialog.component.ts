import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Comment, CommentService} from "../../service/comment.service";
import {LoginService, User} from "../../service/login.service";
import {Post} from "../../service/post.service";

class CommentDialogData {
  post: Post;
  parentComment?: Comment;
}

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent implements OnInit {

  comment: string;
  user: User;
  parentComment: Comment;
  post: Post;

  constructor(public dialogRef: MatDialogRef<CommentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CommentDialogData,
              private commentService: CommentService,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.user = this.loginService.authenticationSubject.getValue();
    this.post = this.data.post;
    this.parentComment = this.data.parentComment;
  }

  saveComment() {
    if (this.comment && this.comment.trim().length > 0) {
      this.commentService.save({
        id: null,
        comment: this.comment,
        post: this.post,
        user: this.user,
        parent: this.parentComment,
        children: null
      }).subscribe(() => this.dialogRef.close(true));
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

}
