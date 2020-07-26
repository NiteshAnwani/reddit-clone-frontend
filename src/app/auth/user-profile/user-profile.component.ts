import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/shared/post-model';
import { CommentPayload } from 'src/app/post/comment/comment-payload';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { CommentService } from 'src/app/post/comment/comment.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name: string;
  postLength: number;
  commentLength: number;
  post: Array<PostModel>;
  comments: Array<CommentPayload>;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private commentService: CommentService) {
    this.name = this.activatedRoute.snapshot.params.name;
    this.postService.getPostByUser(this.name).subscribe(
      (data) => {
        console.log(data);
        this.post = data;
        this.postLength = data.length;
      },
      error => {
        alert("Unable to retrive posts now");
      }
    );
    this.commentService.getCommentByUser(this.name).subscribe(
      (data) => {
        this.comments = data;
        this.commentLength = data.length;
      },
      error => {
        alert("Unable to retrive comments now.");
      }
    );
  }

  ngOnInit(): void {
  }

}
