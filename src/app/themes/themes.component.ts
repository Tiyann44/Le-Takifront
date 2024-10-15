import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'services/theme.service'; // Assurez-vous que le chemin est correct
import { Theme } from 'models/theme.model'; // Assurez-vous que le chemin est correct
import { Router } from '@angular/router'; // Importez Router

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
    /*loadThemes(): void {
        this.themeService.findAll().subscribe((data: Theme[]) => {
            // Ajout de l'image de manière dynamique, sinon mettez à jour l'API pour renvoyer les images
            this.themes = data.map(theme => ({
                ...theme,
                image: 'https://picsum.photos/400/300?random=' + theme.id, // Génération d'images aléatoires
                showQuizzes: false // Initialisation de showQuizzes
            }));
        });
    }*/
    toggleQuizzes(theme: Theme) {
        this.router.navigate(['/quizzes', theme.id]); // Redirige vers la page des quiz
    }



}
