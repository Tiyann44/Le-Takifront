import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { QuizService } from 'services/quiz.service';
import { Quiz } from 'models/quiz.model';

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
        private router: Router
    ) {}

    ngOnInit(): void {
        this.themeId = BigInt(this.route.snapshot.paramMap.get('themeId') || '0');
        this.themeName = this.route.snapshot.paramMap.get('themeName') || '';
        this.loadQuizzes();
    }

    loadQuizzes(): void {
        if (this.themeId !== null) {
            this.quizService.findAll().subscribe((data: Quiz[]) => {
                this.quizzes = data.filter(quiz => {
                    const quizThemeId = Number(quiz.themeId);
                    return quizThemeId === Number(this.themeId);
                });
            });
        } else {
            console.error('Erreur : themeId est null');
        }
    }

    startQuiz(quizId: number): void {
        this.router.navigate(['/quiz', quizId]);
    }
}
