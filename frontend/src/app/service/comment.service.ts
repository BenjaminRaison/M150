import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Post} from "./post.service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {User} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getCommentsByPost(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.backendUrl}/comments/search/getByPost/?postId=${id}`).pipe(
      map((comments: Comment[]) => {
        comments.forEach((comment: Comment) => {
          this.userService.getUserByUrl(comment._links.user).subscribe(user => comment.user = user);
        });
        return comments;
      })
    );
  }
}

export class Comment {
  id: number;
  post?: Post;
  user?: User;
  parent?: Comment;
  children?: Comment[];
  comment: string;
  timestamp: string;
  _links?: any;
}
