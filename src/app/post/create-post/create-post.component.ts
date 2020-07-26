import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubredditModel } from 'src/app/subreddit/subredditmodel';
import { Router } from '@angular/router';
import { CreatePostService } from './create-post.service';
import { CreatePostPayload } from './create-post-payload';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { error } from 'protractor';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostModel: CreatePostPayload
  createPostForm: FormGroup;
  postName = new FormControl('');
  url = new FormControl('');
  subredditName = new FormControl('');
  subreddits: Array<SubredditModel>;
  description = new FormControl('');

  constructor(private router: Router, private createPostService: CreatePostService, private subredditService: SubredditService) {
    this.createPostModel = new CreatePostPayload();
  }

  ngOnInit(): void {
    this.subredditService.getAllSubreddit().subscribe((data) => {
      this.subreddits = data;
    },
    error => {
      throwError(error);
    });
    this.createPostForm = new FormGroup({
      description: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      postName: new FormControl('', Validators.required)
    });
  }

  discardPost() {
    this.router.navigateByUrl('');
  }

  createPost() {
    this.createPostModel.postName = this.createPostForm.get('postName').value;
    this.createPostModel.subredditName = this.createPostForm.get('subredditName').value;
    this.createPostModel.url = this.createPostForm.get('url').value;
    this.createPostModel.description = this.createPostForm.get('description').value;
    this.createPostService.createPost(this.createPostModel).subscribe(
      next =>{
        this.router.navigateByUrl('');
      },
      error => {
        alert('failed to create the post. please try after sometime.');
      }
    );

  }

}
