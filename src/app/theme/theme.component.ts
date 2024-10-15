import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { Theme } from '../models/theme.model';

@Component({
    selector: 'app-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
    themeName = 'Histoire'; // Exemple de thème
    quizzes: Quiz[] = [];

    ngOnInit() {
        // Exemple de quiz - Vous pouvez remplacer cela par un appel à une API
        this.quizzes = [
            { id: 1n, name: 'La Révolution française', description: 'Testez vos connaissances sur la Révolution française.', image: 'assets/revolution.jpg' },
            { id: 2n, name: 'Les Grandes Guerres', description: 'Un quiz sur les guerres mondiales.', image: 'assets/war.jpg' }
        ];
    }

    startQuiz(quizId: bigint | undefined) {
        console.log(`Démarrer le quiz avec l'ID: ${quizId}`);
        // Logique pour démarrer le quiz, par exemple redirection vers la page du quiz
    }
}
