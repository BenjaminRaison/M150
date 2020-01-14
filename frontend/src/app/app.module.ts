import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {LoginComponent} from './pages/login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {UserListComponent} from './pages/user-list/user-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {PostListComponent} from './shared/post-list/post-list.component';
import {HomeComponent} from './pages/home/home.component';
import {PostComponent} from './pages/post/post.component';
import {PostEditComponent} from './pages/post-edit/post-edit.component';
import {CsrfInterceptor} from "./service/csrf.interceptor";
import {MatSelectModule} from "@angular/material/select";
import {BasicInterceptor} from "./service/basic.interceptor";
import {CommentComponent} from './shared/comment/comment.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {CommentDialogComponent} from './shared/comment-dialog/comment-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    PostListComponent,
    HomeComponent,
    PostComponent,
    PostEditComponent,
    CommentComponent,
    CommentDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BasicInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [CommentDialogComponent]
})
export class AppModule {
}
