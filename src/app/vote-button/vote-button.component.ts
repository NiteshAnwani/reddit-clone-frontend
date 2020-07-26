import { Component, OnInit, Input } from '@angular/core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../shared/post-model';
import { ToastrService } from 'ngx-toastr';
import { VoteServiceService } from '../shared/vote-service.service';
import { PostService } from '../shared/post.service';
import { AuthService } from '../auth/shared/auth.service';
import { VotePayload } from '../shared/vote-payload';
import { VoteType } from "./vote-type";
import { throwError } from 'rxjs';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;

  constructor(private toastr: ToastrService, private voteService: VoteServiceService, private postService: PostService, private authService: AuthService) {
    this.votePayload = {
      postId: undefined,
      voteType: undefined
    };
  }

  ngOnInit(): void {
    this.updateVoteDetail();
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.upvoteColor = '';
  }
  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.downvoteColor = '';
  }
  vote()
  {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(
      (data) => {
        this.updateVoteDetail();
      },
      error => {
        this.toastr.error(error.error.exceptionMessage);
        throwError(error);
      }
    );
  }
  private updateVoteDetail()
  {
    this.postService.getPostById(this.post.id).subscribe(
      (data) => {
        this.post = data;
      },
      error => {
        alert("some thing went wrong");
      }
    );
  }
}
