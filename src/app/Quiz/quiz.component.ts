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
    selectedAnswer: Answer | null = null;

    constructor(private route: ActivatedRoute, private questionService: QuestionService) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.quizId = params['id']; // Récupère l'id du quiz depuis l'URL
            this.loadQuestions();
        });
    }

    loadQuestions(): void {
        this.questionService.getQuestionsByQuizId(this.quizId).subscribe((questions: Question[]) => {
            this.questions = questions;
        });
    }

    // Sélectionne une réponse pour la question en cours
    selectChoice(choice: Choice): void {
        this.selectedChoices.set(this.currentQuestionIndex, choice);
    }

    selectOption(selectedAnswer: Answer) {
        this.selectedAnswer = selectedAnswer;
    }


    // Passe à la question suivante
    nextQuestion(): void {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
        } else {
            this.submitQuiz();
        }
    }

    // Vérifie la réponse et calcule le score
    submitQuiz(): void {
        this.questions.forEach((question, index) => {
            const selectedChoice = this.selectedChoices.get(index);
            if (selectedChoice) {
                const correctAnswer = question.answers.find(answer => answer.isCorrect)?.choice;
                if (correctAnswer && selectedChoice.id === correctAnswer.id) {
                    this.score++;
                }
            }
        });
        this.quizCompleted = true;
    }
}
