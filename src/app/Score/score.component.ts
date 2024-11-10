import { Component, OnInit } from '@angular/core';
import { ScoreService } from 'services/score.service';
import { Score } from 'models/score.model';
import { Quiz } from "../models/quiz.model";
import { QuizService } from "../services/quiz.service";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.scss']
})

export class ScoreComponent implements OnInit {
    scores: Score[] = [];      // Tableau pour stocker les scores filtrés
    allScores: Score[] = [];   // Tableau pour stocker tous les scores (non filtrés)
    quizzes: Quiz[] = [];      // Tableau pour stocker les quizzes
    users: User[] = [];        // Tableau pour stocker les utilisateurs

    constructor(
        private scoreService: ScoreService,
        private quizService: QuizService,
        private userService: UserService,

        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.loadScores();  // Charger les scores à l'initialisation
        this.loadQuizzes(); // Charger les quizzes à l'initialisation
    }

    loadScores(): void {
        this.scoreService.findAll().subscribe((data: Score[]) => {
            console.log('Scores récupérés:', data);
            this.allScores = data; // Stocker tous les scores pour le filtrage
            this.updateScoresWithUsersAndQuizzes(data); // Associer utilisateurs et quizzes
            this.filterScoresByQuiz(); // Initialiser le tableau avec tous les scores
        }, error => {
            console.error('Erreur lors de la récupération des scores :', error);
        });
    }

    updateScoresWithUsersAndQuizzes(data: Score[]): void {
        // Charger tous les utilisateurs et quizzes en parallèle
        this.userService.findAll().subscribe((users: User[]) => {
            this.quizService.findAll().subscribe((quizzes: Quiz[]) => {

                // Associer chaque score avec le bon utilisateur et quiz
                data.forEach(score => {
                    let userId = score.userId; // Récupérer l'ID de l'utilisateur
                    score.User = users.find(user => user.id === userId); // Assigner l'utilisateur

                    let quizId = score.quizId; // Récupérer l'ID du quiz
                    score.Quiz = quizzes.find(quiz => quiz.id === quizId); // Assigner le quiz
                });

                // Trier les scores par score décroissant puis par ID
                this.scores = data.sort((a, b) => {
                    if (b.score !== a.score) {
                        return Number(b.score) - Number(a.score); // Tri par score décroissant
                    } else {
                        return Number(a.id) - Number(b.id); // Tri par ID croissant en cas d'égalité
                    }
                });

                console.log('Scores avec utilisateurs et quizzes associés, triés :', this.scores);

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
            this.populateQuizSelect(); // Remplir le menu déroulant avec les quizzes
        }, error => {
            console.error('Erreur lors de la récupération des quizzes :', error);
        });
    }

    populateQuizSelect(): void {
        const quizSelect = document.getElementById('quizSelect') as HTMLSelectElement;

        this.quizzes.forEach(quiz => {
            const option = document.createElement('option');
            option.value = String(quiz.id); // L'ID du quiz
            option.textContent = quiz.name; // Le nom du quiz
            quizSelect.appendChild(option);
        });
    }

    onQuizChange(event: Event): void {
        const target = event.target as HTMLSelectElement;
        const selectedQuizId = target.value;
        console.log('Quiz sélectionné :', selectedQuizId);
        this.filterScoresByQuiz(selectedQuizId);
    }

    filterScoresByQuiz(selectedQuizId: string = 'all'): void {
        if (selectedQuizId === 'all') {
            console.log('Affichage de tous les scores', this.allScores[0].Quiz);
            this.scores = [...this.allScores]; // Réinitialiser avec tous les scores

        } else {
            console.log('Filtrage des scores par quiz ID :', selectedQuizId);
            this.scores = this.allScores.filter(score => score.quizId === Number(selectedQuizId));
            console.log('Scores filtrés :', this.scores);
        }
        console.log(`Scores filtrés par le quiz ID ${selectedQuizId} :`, this.scores);
    }
}
