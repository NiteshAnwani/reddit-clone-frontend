import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { CommentPayload } from '../comment/comment-payload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../comment/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  comments: Array<CommentPayload>;
  text: FormControl;
  commentForm: FormGroup;
  commentPayload: CommentPayload;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute, private commentService: CommentService) {
    this.postId = this.activateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.minLength(1), Validators.nullValidator])
    });

    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsforPost();
  }

  getPostById() {
    this.postService.getPostById(this.postId).subscribe(
      (data) => { this.post = data; },
      error => { throwError(error); }
    );
  }
  getCommentsforPost() {
    this.commentService.getCommnetByPost(this.postId).subscribe(
      (data) => {
        this.comments = data;
      },
      error => { alert("failed to load the comments at current movement"); }
    );
  }
  postComment() {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe(
      data => {
        this.commentForm.get('text').setValue('');
        this.getCommentsforPost();
      },
      error => {
        alert("failed to post the comment");
      }
    );
  }

}
