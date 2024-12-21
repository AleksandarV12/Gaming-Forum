import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  recentPosts: any[] = [];
  userThemes: any[] = [];
  postCount: number = 0;
  themeCount: number = 0;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.loadUserThemes();
  }

  loadUserThemes() {
    this.themeService.getThemes().subscribe((themes: any[]) => {
      this.userThemes = themes;
      this.themeCount = themes.length;
    });
  }
}
