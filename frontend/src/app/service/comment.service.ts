import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
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
    return this.http.get<Comment[]>(`${environment.backendUrl}/comments/search/getByPost/?postId=${id}`);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${environment.backendUrl}/comments/${id}`);
  }

  save(comment: Comment): Observable<any> {
    const dto = {
      comment: comment.comment,
      post: this.toPostUri(comment.post),
      parent: this.toCommentUri(comment.parent),
      user: comment.user._links.self.href
    };
    return this.http.post(`${environment.backendUrl}/comments`, dto);
  }

  private toPostUri(post: Post) {
    if (post) {
      return `${environment.backendUrl}/posts/${post.id}`
    }
    return null;
  }

  private toCommentUri(comment: Comment) {
    if (comment) {
      return `${environment.backendUrl}/comments/${comment.id}`
    }
    return null;
  }
}

export class Comment {
  id: number;
  post?: Post;
  user?: User;
  parent?: Comment;
  children?: Comment[];
  comment: string;
  timestamp?: string;
  _links?: any;
  _embedded?: {
    user?: User;
    post?: Post;
  };
}
