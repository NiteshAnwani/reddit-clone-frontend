import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditComponent } from './subreddit/list-subreddit/list-subreddit.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'view-post/:id', component: ViewPostComponent},
  {path: 'user-profile/:name', component: UserProfileComponent,canActivate:[AuthGuard] },
  {path: 'create-post', component: CreatePostComponent,canActivate:[AuthGuard] },
  {path: 'create-subreddit', component: CreateSubredditComponent,canActivate:[AuthGuard] },
  {path: 'subreddits', component: ListSubredditComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LogInComponent},
  {path: 'list-subreddit', component: ListSubredditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
