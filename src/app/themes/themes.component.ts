import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'services/theme.service';
import { Theme } from 'models/theme.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-themes',
    templateUrl: './themes.component.html',
    styleUrls: ['./themes.component.scss'],
})
export class ThemesComponent implements OnInit {
    themes: Theme[] = [];

    constructor(private themeService: ThemeService, private router: Router) {}

    ngOnInit(): void {
        this.loadThemes();
    }

    loadThemes(): void {
        this.themeService.findAll().subscribe((data: Theme[]) => {
            this.themes = data;
        });
    }
    toggleQuizzes(theme: Theme) {
        this.router.navigate(['/quizzes', theme.id]); // Redirige vers la page des quiz
    }
}
