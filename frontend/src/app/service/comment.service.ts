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
      map((o: any) => <Comment[]>o._embedded.comments),
      map((o: Comment[]) => {
        o.forEach(comment => {
          comment.user = comment._embedded.user;
          comment.post = comment._embedded.post;
          comment._embedded = null;
        });
        return o;
      })
    );
  }

  getCommentWithUser(comment: Comment): Observable<Comment> {
    return this.userService.getUserByUrl(comment._links.user).pipe(map(user => {
      comment.user = user;
      return comment;
    }));
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
  _embedded?: {
    user?: User;
    post?: Post;
  };
}
