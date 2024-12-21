import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isDropdownOpen: boolean = false;
  isProfileMenuOpen: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isProfileMenuOpen = false;
    this.router.navigate(['/home']);
  }

  getUsername(): string {
    return this.authService.getUsername() || 'User';
  }
}
