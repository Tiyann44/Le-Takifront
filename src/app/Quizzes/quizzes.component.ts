import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'services/quiz.service'; // Assurez-vous d'avoir un service pour récupérer les quiz
import { Quiz } from 'models/quiz.model'; // Assurez-vous que le modèle est bien défini

@Component({
    selector: 'app-quizzes',
    templateUrl: './quizzes.component.html',
    styleUrls: ['./quizzes.component.scss'],
})
export class QuizzesComponent implements OnInit {
    quizzes: Quiz[] = [];
    themeId: bigint | null = null; // Changez cela en bigint si c'est ce que vous utilisez

    constructor(private route: ActivatedRoute, private quizService: QuizService) {}

    ngOnInit(): void {
        this.themeId = BigInt(this.route.snapshot.paramMap.get('themeId') || '0'); // Récupérer l'ID du thème
        this.loadQuizzes(this.themeId);
    }

    loadQuizzes(themeId: bigint): void {/*
        // Si vous avez une méthode dans votre service pour obtenir les quiz par ID de thème, utilisez-la ici
        this.quizService.findAll().subscribe((data: Quiz[]) => {
            this.quizzes = data.filter(quiz => quiz.theme.id === themeId); // Filtrer par ID de thème
        });*/
    }
}

