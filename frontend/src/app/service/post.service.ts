import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {LoginService, User} from "./login.service";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private userService: UserService, private loginService: LoginService) {
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get(environment.backendUrl + '/posts').pipe(
      map((value: any) => value._embedded.posts)
    );
  }

  createPost(post: Post): Observable<any> {
    const post1: any = post;
    post1.author = this.loginService.authenticationSubject.getValue()._links.self.href;
    return this.http.post<Post>(environment.backendUrl + '/posts', post1);
  }

  updatePost(post: Post) {
    return this.http.put(environment.backendUrl + `/posts/${post.id}`, post);
  }

  getPostById(id: number): Observable<Post> {
    console.info('called');
    return this.http.get<Post>(`${environment.backendUrl}/posts/${id}`).pipe(
      map(post => {
        console.info('got');
        this.userService.getUserByUrl(post._links.author.href).subscribe(author => post.author = author);
        return post
      })
    );
  }
}

export interface Post {
  id?: number;
  title: string;
  author?: User;
  content: string;
  uploaded?: Date;
  _links?: {
    author: {
      href: string;
    }
  }
}
