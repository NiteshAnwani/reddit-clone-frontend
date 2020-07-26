import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditSidebarComponent } from './subreddit-sidebar.component';

describe('SubredditSidebarComponent', () => {
  let component: SubredditSidebarComponent;
  let fixture: ComponentFixture<SubredditSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubredditSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubredditSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
