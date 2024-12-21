import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-create-theme',
  templateUrl: './create-theme.component.html',
  styleUrls: ['./create-theme.component.css'],
})
export class CreateThemeComponent {
  themeName = '';
  description = '';

  constructor(private themeService: ThemeService, private router: Router) {}

  createTheme(): void {
    const themeData = {
      themeName: this.themeName,
      description: this.description,
    };
    this.themeService.createTheme(themeData).subscribe(() => {
      this.router.navigate(['/themes']);
    });
  }
}
