import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../core/services/posts.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  errorMessage: string = '';

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load posts.';
      },
    });
  }
}
