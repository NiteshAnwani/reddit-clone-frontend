import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';
import { HomeComponent } from './home/home.component';
import { PostTitleComponent } from './post-title/post-title.component';
import { VoteButtonComponent } from './vote-button/vote-button.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubredditSidebarComponent } from './subreddit-sidebar/subreddit-sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomDurationPipe } from './custom-duration.pipe';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ListSubredditComponent } from './subreddit/list-subreddit/list-subreddit.component';
import { EditorModule } from "@tinymce/tinymce-angular";
import { ViewPostComponent } from './post/view-post/view-post.component';
import { CustomDurationUtcPipe } from './custom-duration-utc.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PostTitleComponent,
    VoteButtonComponent,
    SidebarComponent,
    SubredditSidebarComponent,
    CustomDurationPipe,
    CreateSubredditComponent,
    CreatePostComponent,
    ListSubredditComponent,
    ViewPostComponent,
    CustomDurationUtcPipe,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorInterceptor,
      multi:true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
