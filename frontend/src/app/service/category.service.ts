import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get(environment.backendUrl + '/categories').pipe(
      map((value: any) => value._embedded.categories)
    );
  }

  getCategoryByUrl(url: string): Observable<Category> {
    return this.http.get<Category>(url);
  }
}

export class Category {
  name: string;
  _links: {
    self: {
      href: string;
    }
  }
}
