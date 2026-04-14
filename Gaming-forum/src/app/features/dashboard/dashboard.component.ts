import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Theme } from 'src/app/models/theme.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userThemes: Theme[] = [];
  themeCount: number = 0;
  postCount: number = 0;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.loadUserThemes();
  }

  loadUserThemes(): void {
    this.themeService.getThemes().subscribe({
      next: (themes: Theme[]) => {
        this.userThemes = themes;
        this.themeCount = themes.length;
      },
      error: () => {
        console.error('Failed to load themes.');
      },
    });
  }
}
