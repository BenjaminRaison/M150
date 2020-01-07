import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../service/login.service";
import {Post} from "../../service/post.service";


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: Comment;

  constructor() {
  }

  ngOnInit() {
  }

}

export class Comment {
  id: number;
  post: Post;
  user: User;
  parent?: Comment;
  children?: Comment[];
  comment: string;
  timestamp: string;
}
