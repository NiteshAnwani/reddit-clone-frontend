import { Injectable } from '@angular/core';
import { CommentPayload } from './comment-payload';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  getCommentsforPostApiEndpoint = environment.apiEndPoint +'/api/comment/getbypost/';
  postCommentApiEndpoint = environment.apiEndPoint + '/api/comment/createcomment';
  getCommentforUserApiEndPoint = environment.apiEndPoint + '/api/comment/getbyuser';
  constructor(private httpClient: HttpClient) { }

  postComment(comment: CommentPayload)
  {
    return this.httpClient.post(this.postCommentApiEndpoint,comment);
  }

  getCommnetByPost(postid: number)
  {
    return this.httpClient.get<Array<CommentPayload>>(this.getCommentsforPostApiEndpoint+"?id="+postid);
  }
  getCommentByUser(name: string){
    return this.httpClient.get<Array<CommentPayload>>(this.getCommentforUserApiEndPoint+'?name='+name);
  }
}
