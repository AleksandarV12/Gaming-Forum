import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadPosts();
  }

  loadPosts() {
    this.postsService.getPosts().subscribe({
      next: (data) => { this.posts = data; },
      error: (error) => {
        this.errorMessage = 'Error fetching posts';
        console.error('Error fetching posts', error);
      },
    });
  }
}