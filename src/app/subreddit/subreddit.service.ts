import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubredditModel } from './subredditmodel';
import { environment } from 'src/environments/environment';
import { error } from 'protractor';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  subredditApiEndpoint = environment.apiEndPoint + '/api/subreddit/getallsubreddit';
  createSubredditEndPoint = environment.apiEndPoint + '/api/subreddit/createsubreddit';
  constructor(private httpClient: HttpClient) { }

  getAllSubreddit(): Observable<Array<SubredditModel>> {
    return this.httpClient.get<Array<SubredditModel>>(this.subredditApiEndpoint);
  }

  createSubreddits(subredditModel: SubredditModel){
    return this.httpClient.post(this.createSubredditEndPoint,subredditModel);
  }
}
