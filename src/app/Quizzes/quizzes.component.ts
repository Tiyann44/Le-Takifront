import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { QuizService } from 'services/quiz.service'; // Le service pour gérer les quiz
import { Quiz } from 'models/quiz.model'; // Le modèle de données pour les quiz

@Component({
    selector: 'app-quizzes',
    templateUrl: './quizzes.component.html',
    styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {
    quizzes: Quiz[] = [];
    themeId: bigint | null = null;
    themeName: string = '';

    constructor(
        private route: ActivatedRoute,
        private quizService: QuizService,
        private router: Router // Ajout de Router ici
    ) {}

    ngOnInit(): void {
        // Récupérer l'ID du thème et le nom du thème depuis l'URL
        this.themeId = BigInt(this.route.snapshot.paramMap.get('themeId') || '0');
        this.themeName = this.route.snapshot.paramMap.get('themeName') || '';
        //console.log(this.themeId);

        this.loadQuizzes();
    }

    loadQuizzes(): void {
        if (this.themeId !== null) {
            this.quizService.findAll().subscribe((data: Quiz[]) => {
                this.quizzes = data.filter(quiz => {
                    const quizThemeId = Number(quiz.themeId);
                    return quizThemeId === Number(this.themeId); // Comparer les deux en tant que number
                });
            });
        } else {
            console.error('Erreur : themeId est null');
        }
    }



    startQuiz(quizId: bigint): void {
        this.router.navigate(['/quiz', quizId]); // Redirige vers la page du quiz sélectionné
    }



}
