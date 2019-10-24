import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {UserListComponent} from "./pages/user-list/user-list.component";
import {HomeComponent} from "./pages/home/home.component";
import {PostComponent} from "./pages/post/post.component";
import {PostEditComponent} from "./pages/post-edit/post-edit.component";

// TODO: Add route guards
const routes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'post/create', component: PostEditComponent},
  {path: 'post/:id', component: PostComponent},
  {path: 'post/:id/edit', component: PostEditComponent}, // TODO: AuthGuard
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
