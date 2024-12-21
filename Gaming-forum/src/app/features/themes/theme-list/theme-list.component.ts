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

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getThemes().subscribe(
      (data) => {
        console.log('Fetched themes:', data);
        this.themes = data;
      },
      (error) => {
        console.error('Error fetching themes:', error);
      }
    );
  }
}
