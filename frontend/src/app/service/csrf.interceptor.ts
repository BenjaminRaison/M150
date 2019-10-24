import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

// Code taken from: https://github.com/angular/angular/issues/18859#issuecomment-343386182
@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestToForward = req;
    let token = this.getToken("XSRF-TOKEN");
    if (token !== null) {
      requestToForward = req.clone({setHeaders: {"X-XSRF-TOKEN": token}});
    }
    return next.handle(requestToForward);
  }

  // From: https://gist.github.com/hunan-rostomyan/28e8702c1cecff41f7fe64345b76f2ca
  private getToken(name: string): string {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }

}
