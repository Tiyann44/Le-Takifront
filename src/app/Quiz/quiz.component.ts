import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';
import { Choice } from '../models/choice.model';
import { Answer } from '../models/answer.model';
import { AnswerService } from '../services/Answer.service';
import {ChoiceService} from "../services/choice.service";
import {ScoreService} from "../services/score.service";
import {Score} from "../models/score.model";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
    quizId!: number;
    questions: Question[] = [];
    answers: Answer[] = [];
    choices: Choice[] = [];
    currentQuestionIndex: number = 0;
    selectedChoices: Map<number, Choice> = new Map();
    score: number = 0;
    quizCompleted: boolean = false;
    endMessage: string = '';

    constructor(
        private route: ActivatedRoute,
        private questionService: QuestionService,
        private answerService: AnswerService,
        private choiceService: ChoiceService,
        private scoreService: ScoreService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.quizId = Number(params['id']);
            this.loadQuestions();
        });
    }

    loadQuestions(): void {
        this.questionService.findAll().subscribe((data: Question[]) => {
            this.questions = data.filter(question => Number(question.quizId) === this.quizId);

            if (this.questions.length === 0) {
                console.log('Aucune question disponible pour ce quiz.');
            } else {
                this.loadAnswers();

                console.log('Questions récupérées:', this.questions);
                console.log('Réponses récupérées:', this.answers);
                console.log('Choix récupérés:', this.choices);
            }
        }, error => {
            console.error('Erreur lors de la récupération des questions:', error);
        });
    }

    loadAnswers(): void {
        this.questions.forEach(question => {
            this.answerService.getAnswersByQuestionId(Number(question.id)).subscribe((answers: Answer[]) => {
                question.answers = answers;
                this.shuffleAnswers(question.answers);
                this.answers.push(...answers);
                answers.forEach(currentAnswer => {
                    this.choiceService.findById(Number(currentAnswer.choiceId)).subscribe((choice: Choice) => {
                        currentAnswer.choice = choice;
                    });
                });
            }, error => {
                console.error('Erreur lors du chargement des réponses:', error);
            });
        });
    }

    shuffleAnswers(answers: Answer[]): void {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
    }

    selectChoice(choice: Choice): void {
        this.selectedChoices.set(this.currentQuestionIndex, choice);
    }

    nextQuestion(): void {
        const selectedChoice = this.selectedChoices.get(this.currentQuestionIndex);
        if (!selectedChoice) {
            alert('Veuillez sélectionner un choix avant de passer à la question suivante.');
            return;
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
            if (selectedChoice && correctAnswer && selectedChoice.id === correctAnswer.choice?.id) {
                this.score++;
            }
        });

        this.quizCompleted = true;
        const scorePercentage = (this.score / this.questions.length) * 100;
        this.endMessage = this.generateEndMessage(scorePercentage);

        const currentUser = this.authService.getCurrentUser();

        if (!currentUser) {
            console.error('Aucun utilisateur connecté !');
            return;
        }

        const scoreData: Score = {
            quizId: this.quizId,
            userId: currentUser.id,
            score: scorePercentage,
            message: this.endMessage,
            Quiz: undefined,
            User: undefined
        };

        this.saveScore(scoreData);
    }

    generateEndMessage(scorePercentage: number): string {
        if (scorePercentage === 100) {
            return 'Trop fort ! 🌟 Tu es un(e) vrai(e) pro !';
        } else if (scorePercentage >= 75) {
            return 'Bien joué ! 👍 Tu as une bonne connaissance du jeu!';
        } else if (scorePercentage >= 50) {
            return 'C est limite ! 😐 Tu as juste les bases, continue de jouer pour t améliorer.';
        } else if (scorePercentage >= 25) {
            return 'C est mauvais... 😞 Essayez de faire mieux la prochaine fois.';
        } else {
            return 'Je suis sans voix... 😢 As-tu vraiment déjà joué à ce jeu ?!';
        }
    }

    saveScore(scoreData: Score): void {
        this.scoreService.findAll().subscribe((scores: Score[]) => {
            const existingScore = scores.find(score => score.quizId === this.quizId && score.userId === scoreData.userId);

            if (existingScore) {
                if (scoreData.score > existingScore.score) {
                    scoreData.id = existingScore.id;
                    this.scoreService.update(Number(scoreData.id), scoreData).subscribe(() => {
                        console.log('Score mis à jour avec succès car il est supérieur:', scoreData);
                    });
                }
            } else {
                this.scoreService.create(scoreData).subscribe(() => {
                    console.log('Score enregistré avec succès:', scoreData);
                });
            }
        });
    }


    resetQuiz(): void {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedChoices.clear();
        this.quizCompleted = false;
        this.loadQuestions();
    }
}
