import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  errorMessage: string = '';

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postsService.getPosts().subscribe(
      (data) => {
        this.posts = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching posts';
        console.error('Error fetching posts', error);
      }
    );
  }
}
