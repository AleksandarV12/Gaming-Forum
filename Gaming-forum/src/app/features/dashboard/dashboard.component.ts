import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { PostsService } from 'src/app/core/services/posts.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Theme } from 'src/app/models/theme.model';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userThemes: Theme[] = [];
  userPosts: Post[] = [];
  themeCount: number = 0;
  postCount: number = 0;

  constructor(
    private themeService: ThemeService,
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserThemes();
    this.loadUserPosts();
  }

  loadUserThemes(): void {
    const userId = this.authService.getUserId();
    this.themeService.getThemes().subscribe({
      next: (themes: Theme[]) => {
        this.userThemes = themes.filter(t => t.userId === userId);
        this.themeCount = this.userThemes.length;
      },
      error: () => { console.error('Failed to load themes.'); }
    });
  }

  loadUserPosts(): void {
    const userId = this.authService.getUserId();
    this.postsService.getPosts().subscribe({
      next: (posts: Post[]) => {
        this.userPosts = posts.filter(p => p.userId === userId);
        this.postCount = this.userPosts.length;
      },
      error: () => { console.error('Failed to load posts.'); }
    });
  }
}