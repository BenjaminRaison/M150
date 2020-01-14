import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment, CommentService} from "../../service/comment.service";
import {LoginService, User} from "../../service/login.service";
import {BehaviorSubject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {CommentDialogComponent} from "../comment-dialog/comment-dialog.component";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: Comment;
  @Output('reload') reload: EventEmitter<void> = new EventEmitter<void>();
  private user: BehaviorSubject<User>;


  constructor(private commentService: CommentService, private loginService: LoginService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.user = this.loginService.authenticationSubject;
  }

  openDialog($event): void {
    $event.stopPropagation();

    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '400px',
      data: {parentComment: this.comment, post: this.comment.post}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reload.next();
      }
    });
  }

  deleteComment(comment: Comment, $event) {
    $event.stopPropagation();
    this.commentService.deleteById(comment.id).subscribe(
      () => this.reload.next()
    );
  }
}
