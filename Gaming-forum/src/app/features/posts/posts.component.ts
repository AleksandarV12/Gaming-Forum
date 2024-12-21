import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postsService.getPosts().subscribe(
      (data: any) => {
        this.posts = data;
      },
      (error) => {
        console.error('Error fetching posts', error);
      }
    );
  }
}
