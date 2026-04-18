import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../../core/services/posts.service';
import { AuthService } from '../../../core/services/auth.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  post: Post | null = null;
  isEditing = false;
  editTitle = '';
  editText = '';
  errorMessage = '';
  currentUsername = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUsername = this.authService.getUsername();
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.postsService.getPostById(postId).subscribe({
        next: (data) => {
          this.post = data;
        },
        error: () => {
          this.errorMessage = 'Failed to load post.';
        },
      });
    }
  }

  isOwner(): boolean {
    return this.post?.userId === this.authService.getUserId();
  }

  startEdit(): void {
    this.isEditing = true;
    this.editTitle = this.post?.title || '';
    this.editText = this.post?.text || '';
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  saveEdit(): void {
  if (!this.editTitle || !this.editText) {
    this.errorMessage = 'Title and text cannot be empty.';
    return;
  }
  this.postsService.updatePost(this.post!._id, {
    title: this.editTitle,
    text: this.editText
  }).subscribe({
    next: (response: any) => {
      this.post = response.post || response;
      this.isEditing = false;
      this.errorMessage = '';
    },
    error: () => { this.errorMessage = 'Failed to update post.'; }
  });
}

  deletePost(): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postsService.deletePost(this.post!._id).subscribe({
        next: () => {
          this.router.navigate(['/posts']);
        },
        error: () => {
          this.errorMessage = 'Failed to delete post.';
        },
      });
    }
  }
}
