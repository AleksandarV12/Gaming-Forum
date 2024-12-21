import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-theme-details',
  templateUrl: './theme-details.component.html',
  styleUrls: ['./theme-details.component.css'],
})
export class ThemeDetailsComponent implements OnInit {
  theme: any;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    const themeId = this.route.snapshot.paramMap.get('id');
    if (themeId) {
      this.themeService.getThemeById(themeId).subscribe(
        (data) => {
          this.theme = data;
          this.errorMessage = null;
        },
        (error) => {
          this.errorMessage =
            'Failed to load theme details. Please try again later.';
          console.error('Error fetching theme:', error);
        }
      );
    }
  }
}
