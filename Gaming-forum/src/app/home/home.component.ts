import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  errorMessage: string = '';

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postsService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching posts';
        console.error('Error fetching posts', error);
      },
    });
  }
}
