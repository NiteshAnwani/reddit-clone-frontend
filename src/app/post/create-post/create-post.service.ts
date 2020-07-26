import { Injectable } from '@angular/core';
import { PostModel } from 'src/app/shared/post-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreatePostPayload } from './create-post-payload';
import { catchError, map } from 'rxjs/operators';
import { error } from 'protractor';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {

  createPostApiEndpoint = environment.apiEndPoint + '/api/post/createpost';

  constructor(private httpClient: HttpClient) { }

  createPost(postModel: CreatePostPayload)
  {
   return this.httpClient.post(this.createPostApiEndpoint,postModel).pipe(
     map(response => {return response;}),
     catchError(error => {throw throwError(error);})
   );
  }

}
