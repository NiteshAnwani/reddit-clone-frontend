import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postApiEndpoint: string = environment.apiEndPoint + '/api/post/getallpost';
  getPostByidApiEndPoint = environment.apiEndPoint + '/api/post/getpost/';
  getPostByUserApiEndPoint = environment.apiEndPoint + '/api/post/getpostbyuser/';

  constructor(private httpClient: HttpClient) { }

  getAllPost(): Observable<Array<PostModel>>
  {
    return this.httpClient.get<Array<PostModel>>(this.postApiEndpoint);
  }
  
  getPostById(id: number)
  {
    return this.httpClient.get<PostModel>(this.getPostByidApiEndPoint+id);
  }
  getPostByUser(user: string){
    return this.httpClient.get<Array<PostModel>>(this.getPostByUserApiEndPoint+user);
  }
}
