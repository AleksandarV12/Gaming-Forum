import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  title: string = '';
  text: string = '';
  themeId: string = '';

  constructor(
    private authService: AuthService,
    private postsService: PostsService
  ) {}

  onSubmit() {
    if (this.title && this.text && this.themeId) {
      const postData = {
        title: this.title,
        text: this.text,
        themeId: this.themeId,
        userId: this.authService.getUserId(),
      };

      const token = this.authService.getToken();

      if (token) {
        this.postsService.createPost(postData, token).subscribe(
          (response: any) => {
            console.log('Post created successfully!', response);
          },
          (error: any) => {
            console.error('Error creating post:', error);
          }
        );
      } else {
        console.error('No token found, user may not be authenticated.');
      }
    } else {
      console.error('All fields must be filled out.');
    }
  }
}
