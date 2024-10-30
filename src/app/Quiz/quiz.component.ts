import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';
import { Choice } from '../models/choice.model';
import { Answer } from '../models/answer.model';
import { AnswerService } from '../services/answer.service';
import {forkJoin, tap} from "rxjs";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
    quizId!: number;
    questions: Question[] = [];
    currentQuestionIndex: number = 0;
    selectedChoices: Map<number, Choice> = new Map(); // Stocke les choix sélectionnés
    score: number = 0;
    quizCompleted: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private questionService: QuestionService,
        private answerService: AnswerService
) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.quizId = Number(params['id']);
            console.log('Quiz ID récupéré:', this.quizId); // Ajoute cette ligne
            this.loadQuestions();
        });
    }


    loadQuestions(): void {
        this.questionService.findAll().subscribe((data: Question[]) => {
            this.questions = data.filter(question => Number(question.quizId) === this.quizId);

            console.log('Questions après filtrage:', this.questions);

            if (this.questions.length === 0) {
                console.log('Aucune question disponible pour ce quiz.');
            } else {
                this.loadAnswers(); // Charger les réponses après avoir récupéré les questions
            }
        }, error => {
            console.error('Erreur lors de la récupération des questions:', error);
        });
    }

    loadAnswers(): void {
        this.questions.forEach(question => {
            this.answerService.getAnswersByQuestionId(Number(question.id)).subscribe((answers: Answer[]) => {
                question.answers = answers;
                console.log(`Réponses pour la question ${question.id}:`, question.answers);
            }, error => {
                console.error('Erreur lors du chargement des réponses:', error);
            });
        });
    }



    /*
            forkJoin(allChoicesObservables).subscribe(() => {
                console.log('Tous les choix ont été chargés.');
            }, error => {
                console.error('Erreur lors du chargement des choix:', error);
            });
        }*/



    selectChoice(choice: Choice): void {
        this.selectedChoices.set(this.currentQuestionIndex, choice);
    }

    nextQuestion(): void {
        // Vérifie si un choix a été sélectionné pour la question actuelle
        const selectedChoice = this.selectedChoices.get(this.currentQuestionIndex);
        if (!selectedChoice) {
            alert('Veuillez sélectionner un choix avant de passer à la question suivante.'); // Alerte si aucun choix n'est sélectionné
            return; // Empêche de passer à la question suivante
        }

        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
        } else {
            this.submitQuiz();
        }
    }


    submitQuiz(): void {
        this.questions.forEach((question, index) => {
            const selectedChoice = this.selectedChoices.get(index);
            const correctAnswer = question.answers.find(answer => answer.isCorrect);
            if (selectedChoice && correctAnswer && selectedChoice.id === correctAnswer.id) {
                this.score++;
            }
        });
        this.quizCompleted = true;
    }

    resetQuiz(): void {
        this.currentQuestionIndex = 0; // Réinitialiser l'index de la question
        this.score = 0; // Réinitialiser le score
        this.selectedChoices.clear(); // Vider les choix sélectionnés
        this.quizCompleted = false; // Réinitialiser l'état de complétion du quiz
        this.loadQuestions(); // Recharger les questions (si nécessaire)
    }

}
