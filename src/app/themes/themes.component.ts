import { Component } from '@angular/core';

interface Quiz {
    id: string;
    title: string;
}

interface Theme {
    title: string;
    description: string;
    image: string;
    quizzes: Quiz[];
    showQuizzes?: boolean; // Pour gérer l'affichage des quiz
}

@Component({
    selector: 'app-themes',
    templateUrl: './themes.component.html',
    styleUrls: ['./themes.component.scss'], // Si tu as un fichier SCSS
})
export class ThemesComponent {
    themes: Theme[] = [
        {
            title: 'Histoire',
            description: 'Explorez les époques et les événements qui ont façonné notre monde.',
            image: 'https://picsum.photos/400/300?random=1',
            quizzes: [
                { id: 'h1', title: 'La Révolution Française' },
                { id: 'h2', title: 'La Seconde Guerre Mondiale' },
                { id: 'h3', title: 'Les Grandes Civilisations Antiques' }
            ]
        },
        {
            title: 'Sciences',
            description: 'Découvrez les merveilles de la science et de la technologie.',
            image: 'https://picsum.photos/400/300?random=2',
            quizzes: [
                { id: 's1', title: 'Les Lois de la Physique' },
                { id: 's2', title: 'L\'Évolution des Espèces' },
                { id: 's3', title: 'Les Découvertes Spatiales' }
            ]
        },
        // Ajoute les autres thèmes ici...
    ];

    toggleQuizzes(theme: Theme) {
        theme.showQuizzes = !theme.showQuizzes; // Basculer l'affichage des quiz
    }
}
