import { Component, OnInit } from '@angular/core';
import { SubredditModel } from '../subreddit/subredditmodel';
import { SubredditService } from '../subreddit/subreddit.service';

@Component({
  selector: 'app-subreddit-sidebar',
  templateUrl: './subreddit-sidebar.component.html',
  styleUrls: ['./subreddit-sidebar.component.css']
})
export class SubredditSidebarComponent implements OnInit {

  subreddits: Array<SubredditModel> = [];
  displayViewAll: boolean;

  constructor(private subredditService: SubredditService) {
    this.subredditService.getAllSubreddit().subscribe(data => {
      if (data.length >= 4) {
        this.subreddits = data.slice(0, 3);
        this.displayViewAll = true;
      }
      else {
        this.subreddits = data;
      }
    });
  }

  ngOnInit(): void {
  }

}
