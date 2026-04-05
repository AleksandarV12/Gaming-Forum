import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Theme } from 'src/app/models/theme.model';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css'],
})
export class ThemeListComponent implements OnInit {
  themes: Theme[] = [];
  errorMessage: string = '';

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getThemes().subscribe({
      next: (data) => {
        this.themes = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load themes.';
      },
    });
  }
}
