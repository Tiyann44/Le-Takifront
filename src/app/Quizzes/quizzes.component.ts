import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'services/quiz.service'; // Le service pour gérer les quiz
import { Quiz } from 'models/quiz.model'; // Le modèle de données pour les quiz

@Component({
    selector: 'app-quizzes',
    templateUrl: './quizzes.component.html',
    styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {
    quizzes: Quiz[] = [];
    themeId: bigint | null = null; // L'ID du thème sélectionné
    themeName: string = ''; // Le nom du thème sélectionné

    constructor(
        private route: ActivatedRoute,
        private quizService: QuizService
    ) {}

    ngOnInit(): void {
        // Récupérer l'ID du thème et le nom du thème depuis l'URL
        this.themeId = BigInt(this.route.snapshot.paramMap.get('themeId') || '0');
        this.themeName = this.route.snapshot.paramMap.get('themeName') || '';

        this.loadQuizzes();
    }

    loadQuizzes(): void {
        // Charger les quiz en filtrant par le thème sélectionné
        this.quizService.findAll().subscribe((data: Quiz[]) => {
            this.quizzes = data.filter(quiz => quiz.theme.id === this.themeId);
        });
    }


}
