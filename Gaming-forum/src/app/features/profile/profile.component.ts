import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  username: string = '';
  email: string = '';

  constructor(private authService: AuthService) {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.username = this.authService.getUsername();
    this.email = this.authService.getEmail();
  }
}
