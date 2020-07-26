import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../shared/post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.css']
})
export class PostTitleComponent implements OnInit {


  @Input() data: Array<PostModel>; 

  faComments = faComments;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goToPost(id: number)
  {
    this.router.navigateByUrl('/view-post/'+id);
  }

}
