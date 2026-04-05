import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostsService } from 'src/app/core/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  title: string = '';
  text: string = '';
  themeId: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private router: Router
  ) {}

  onSubmit() {
    this.errorMessage = '';

    if (!this.title || !this.text || !this.themeId) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.title.length < 3) {
      this.errorMessage = 'Title must be at least 3 characters long.';
      return;
    }

    if (this.text.length < 10) {
      this.errorMessage = 'Post text must be at least 10 characters long.';
      return;
    }

    const postData = {
      title: this.title,
      text: this.text,
      themeId: this.themeId,
      userId: this.authService.getUserId() ?? undefined,
    };

    this.postsService.createPost(postData).subscribe({
      next: () => {
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Failed to create post. Please try again.';
      },
    });
  }
}
