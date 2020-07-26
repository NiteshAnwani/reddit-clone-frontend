import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VotePayload } from "./vote-payload";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoteServiceService {

  voteApiEndPoint = environment.apiEndPoint + '/api/vote/dovote';

  constructor(private httpClient:HttpClient) { }

  vote(votePayload: VotePayload)
  {
   return this.httpClient.post(this.voteApiEndPoint,votePayload);
  }
}
