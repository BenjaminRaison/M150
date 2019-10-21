import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "./login.service";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get(environment.backendUrl + '/posts').pipe(
      map((value: any) => value._embedded.posts)
    );
  }

  createPost(post: Post): Observable<any> {
    return this.http.post(environment.backendUrl + '/posts', post);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${environment.backendUrl}/posts/${id}`).pipe(
      map(post => {
        this.userService.getUserByUrl(post._links.author.href).subscribe(author => post.author = author);
        return post
      })
    );
  }
}

export interface Post {
  id?: number;
  title: string;
  author: User;
  content: string;
  uploaded: Date;
  _links: {
    author: {
      href: string;
    }
  }
}
