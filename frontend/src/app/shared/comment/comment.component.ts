import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment, CommentService} from "../../service/comment.service";
import {LoginService, User} from "../../service/login.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: Comment;
  @Output('deleted') onDeleted: EventEmitter<void> = new EventEmitter<void>();
  private user: BehaviorSubject<User>;


  constructor(private commentService: CommentService, private loginService: LoginService) {
  }

  ngOnInit() {
    this.user = this.loginService.authenticationSubject;
  }

  deleteComment(comment: Comment) {
    this.commentService.deleteById(comment.id).subscribe(
      () => this.onDeleted.next()
    );
  }
}
