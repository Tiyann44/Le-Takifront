import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { Question } from '../models/question.model';
import { Choice } from '../models/choice.model';
import { Answer } from '../models/answer.model';
import { AnswerService } from '../services/Answer.service';
import {ChoiceService} from "../services/choice.service";
import {forkJoin, of, tap} from "rxjs";

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
    quizId!: number;
    questions: Question[] = [];
    answers : Answer[] = [];
    currentAnswer: Answer | undefined;
    choices : Choice[] = [];
    currentQuestionIndex: number = 0;
    selectedChoices: Map<number, Choice> = new Map(); // Stocke les choix sélectionnés
    score: number = 0;
    quizCompleted: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private questionService: QuestionService,
        private answerService: AnswerService,
        private choiceService: ChoiceService
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
                //this.loadChoices(); // Charger les choix après avoir récupéré les réponses
            }
        }, error => {
            console.error('Erreur lors de la récupération des questions:', error);
        });
    }

    loadAnswers(): void {
        this.questions.forEach(question => {
            console.log(`Récupération des réponses pour la question ID: ${question.id}`); // Log pour le début de la récupération des réponses

            this.answerService.getAnswersByQuestionId(Number(question.id)).subscribe((answers: Answer[]) => {
                question.answers = answers;
                this.loadChoices(answers)
                this.answers.push(...answers);
                console.log(`Réponses récupérées pour la question ${question.id}:`, answers); // Log des réponses récupérées
            }, error => {
                console.error('Erreur lors du chargement des réponses:', error);
            });
        });

    }

    loadChoices(answers: Answer[]) { // Recevez les réponses en paramètre
        const questionChoices: Choice[] = []; // Tableau pour stocker les choix de la question actuelle

        answers.forEach(answer => {
            if (answer.choiceId) { // Vérifiez que choiceId existe
                console.log(`Récupération du choix pour la réponse ID: ${answer.id}, Choice ID: ${answer.choiceId}`); // Log pour la récupération
                this.choiceService.findById(Number(answer.choiceId)).subscribe((choice: Choice) => {
                        if (choice) {
                            questionChoices.push(choice); // Ajoutez le choix valide au tableau de choix de la question
                            console.log(`Choix récupéré pour la réponse ${answer.id}:`, choice); // Log du choix récupéré
                        } else {
                            console.warn(`Réponse ${answer.id} n'a pas de choix valide.`); // Log si aucun choix valide
                        }
                    },
                    error => {
                        console.error(`Erreur lors du chargement du choix pour la réponse ${answer.id}:`, error); // Log d'erreur
                    });
            } else {
                console.warn(`Réponse ${answer.id} n'a pas de choix associé.`); // Log si choiceId n'est pas défini
            }
        });

        // Une fois tous les choix récupérés, vous pouvez faire quelque chose avec questionChoices
        // Par exemple, vous pouvez les assigner à une propriété de votre question ou simplement les afficher
        console.log(`Tous les choix pour la question:`, questionChoices);
    }

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
