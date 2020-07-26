import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { PostModel } from '../shared/post-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post: Array<PostModel>;

  constructor(private postService: PostService) { 
    this.postService.getAllPost().subscribe(posts => {
      this.post = posts;
    });
  }

  ngOnInit(): void {
  }

}
