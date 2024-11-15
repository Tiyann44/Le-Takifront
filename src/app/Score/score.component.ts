import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'services/score.service';
import { Score } from 'models/score.model';
import { Quiz } from "../models/quiz.model";
import { QuizService } from "../services/quiz.service";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.scss']
})

export class ScoreComponent implements OnInit {
    scores: Score[] = [];
    allScores: Score[] = [];
    quizzes: Quiz[] = [];
    users: User[] = [];

    constructor(
        private scoreService: ScoreService,
        private quizService: QuizService,
        private userService: UserService,
        ) {}

    ngOnInit(): void {
        this.loadScores();
        this.loadQuizzes();
    }

    loadScores(): void {
        this.scoreService.findAll().subscribe((data: Score[]) => {
            console.log('Scores récupérés:', data);
            this.allScores = data;
            this.updateScoresWithUsersAndQuizzes(data);
            this.filterScoresByQuiz();
        }, error => {
            console.error('Erreur lors de la récupération des scores :', error);
        });
    }

    updateScoresWithUsersAndQuizzes(data: Score[]): void {
        this.userService.findAll().subscribe((users: User[]) => {
            this.quizService.findAll().subscribe((quizzes: Quiz[]) => {
                data.forEach(score => {
                    let userId = score.userId;
                    score.User = users.find(user => user.id === userId);
                    let quizId = score.quizId;
                    score.Quiz = quizzes.find(quiz => quiz.id === quizId);
                });

                this.scores = data.sort((a, b) => {
                    if (b.score !== a.score) {
                        return Number(b.score) - Number(a.score);
                    } else {
                        return Number(a.id) - Number(b.id);
                    }
                });
            }, error => {
                console.error('Erreur lors de la récupération des quizzes :', error);
            });
        }, error => {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
        });
    }

    loadQuizzes(): void {
        this.quizService.findAll().subscribe((quizzes: Quiz[]) => {
            this.quizzes = quizzes;
            this.populateQuizSelect();
        }, error => {
            console.error('Erreur lors de la récupération des quizzes :', error);
        });
    }

    populateQuizSelect(): void {
        const quizSelect = document.getElementById('quizSelect') as HTMLSelectElement;

        this.quizzes.forEach(quiz => {
            const option = document.createElement('option');
            option.value = String(quiz.id);
            option.textContent = quiz.name;
            quizSelect.appendChild(option);
        });
    }

    onQuizChange(event: Event): void {
        const target = event.target as HTMLSelectElement;
        const selectedQuizId = target.value;
        this.filterScoresByQuiz(selectedQuizId);
    }

    filterScoresByQuiz(selectedQuizId: string = 'all'): void {
        if (selectedQuizId === 'all') {
            this.scores = [...this.allScores];

        } else {
            this.scores = this.allScores.filter(score => score.quizId === Number(selectedQuizId));
        }
    }
}
