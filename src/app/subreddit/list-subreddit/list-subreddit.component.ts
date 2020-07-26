import { Component, OnInit, Input } from '@angular/core';
import { SubredditModel } from '../subredditmodel';
import { SubredditService } from '../subreddit.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-subreddit',
  templateUrl: './list-subreddit.component.html',
  styleUrls: ['./list-subreddit.component.css']
})
export class ListSubredditComponent implements OnInit {

  subreddits: Array<SubredditModel>;

  constructor(private subredditService: SubredditService) { }

  ngOnInit(): void {
    this.subredditService.getAllSubreddit().subscribe(data => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    });
  }

}
