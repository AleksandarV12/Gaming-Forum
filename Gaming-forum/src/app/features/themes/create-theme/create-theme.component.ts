import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.css'],
})
export class CreateThemeComponent {
  themeName: string = '';
  description: string = '';
  errorMessage: string = '';

  constructor(private themeService: ThemeService, private router: Router) {}

  createTheme(): void {
    this.errorMessage = '';

    if (!this.themeName || !this.description) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.themeName.length < 3) {
      this.errorMessage = 'Theme name must be at least 3 characters long.';
      return;
    }

    if (this.description.length < 10) {
      this.errorMessage = 'Description must be at least 10 characters long.';
      return;
    }

    const themeData = {
      themeName: this.themeName,
      description: this.description,
    };

    this.themeService.createTheme(themeData).subscribe({
      next: () => {
        this.router.navigate(['/themes']);
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Failed to create theme. Please try again.';
      },
    });
  }
}
