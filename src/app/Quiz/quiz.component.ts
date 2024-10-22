import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';
import { Choice } from '../models/choice.model';
import { Answer } from '../models/answer.model';

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

    constructor(private route: ActivatedRoute, private questionService: QuestionService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.quizId = Number(params['id']);
            console.log('Quiz ID récupéré:', this.quizId); // Ajoute cette ligne
            this.loadQuestions();
        });
    }


    loadQuestions(): void {
        this.questionService.findAll().subscribe((data: Question[]) => {
            // Filtrer les questions selon le quizId
            this.questions = data.filter(question => {
                return Number(question.quizId) === this.quizId ; // Comparer avec le quizId actuel
            });

            // Log pour vérifier le résultat du filtrage
            console.log('Questions récupérées pour le quiz:', this.questions);

            if (this.questions.length === 0) {
                console.log('Aucune question disponible pour ce quiz.');
            }
        }, error => {
            console.error('Erreur lors de la récupération des questions:', error);
        });
    }






    selectChoice(choice: Choice): void {
        this.selectedChoices.set(this.currentQuestionIndex, choice);
    }

    nextQuestion(): void {
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
}
