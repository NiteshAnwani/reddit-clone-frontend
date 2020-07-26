import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubredditService } from '../subreddit.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SubredditModel } from '../subredditmodel';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {
  createSubredditForm: FormGroup;
  subredditModel: SubredditModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router, private subredditService: SubredditService) {
    this.subredditModel = new SubredditModel();
    this.createSubredditForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    });
  }

  ngOnInit(): void {

  }

  discard() {
    this.router.navigateByUrl('');
  }

  createSubreddit() {
    this.subredditModel.name = this.createSubredditForm.get('title').value;
    this.subredditModel.description = this.createSubredditForm.get('description').value;
    this.subredditService.createSubreddits(this.subredditModel).subscribe(
      next => {
        this.router.navigateByUrl('/list-subreddit');
      },
      error => {
        console.log("error occured" + error);
      }
    );
  }

}
