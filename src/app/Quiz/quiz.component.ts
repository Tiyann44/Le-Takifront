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
                this.loadChoices()
                this.answers.push(...answers);
                console.log(`Réponses récupérées pour la question ${question.id}:`, answers); // Log des réponses récupérées
            }, error => {
                console.error('Erreur lors du chargement des réponses:', error);
            });
        });

    }

/*
    loadChoices(): void {
        this.answers.forEach(answer => {
            console.log(`Récupération des choix pour la question ID: ${answer.id}`); // Log pour le début de la récupération des réponses

            this.choiceService.findAll().subscribe((datachoices: Choice[]) => {
                // Log des ID avant la comparaison
                console.log(`Choix disponibles:`, datachoices.map(choice => choice.id)); // Log des IDs des choix disponibles

                // Filtrage des choix
                this.choices = datachoices.filter(choice => {
                    const isMatch = Number(choice.id) === Number(answer.choiceId); // correction de choiceId à choice.id
                    console.log(`Comparaison: choice.id = ${choice.id}, answer.choice.id = ${answer.choiceId}, match = ${isMatch}`);
                    return isMatch; // retour du résultat de la comparaison
                });

                console.log('Choix après filtrage:', this.choices); // Log des choix après filtrage

                // Log des réponses récupérées
                console.log(`Réponses récupérées pour la question ${answer.id}:`, this.choices); // Log des réponses récupérées
            }, error => {
                console.error('Erreur lors du chargement des réponses:', error);
            });
        });
    }




    /*
        loadChoices(): void {
            const choiceRequests = this.answers.map(answer => {
                if (answer.choice && this.choices[Number(answer.choiceId)]) {
                    return this.choiceService.findById(Number(answer.choiceId)).pipe(
                        tap((choice: Choice) => {
                            console.log(`Choix récupéré pour la réponse ${answer.id}:`, choice);
                        })
                    );
                } else {
                    console.warn(`Réponse ${answer.id} n'a pas de choix valide.`);
                    return of(null); // Importez `of` de 'rxjs'
                }
            }).filter(request => request !== null); // Filtrer les requêtes null

            forkJoin(choiceRequests).subscribe({
                next: (choices) => {
                    // Filtrer les choix valides (non null) et utiliser une assertion de type
                    this.choices = choices.filter(choice => choice !== null) as Choice[];
                    console.log('Tous les choix ont été récupérés:', this.choices);
                },
                error: error => {
                    console.error('Erreur lors de la récupération des choix:', error);
                }
            });
        }
*/
    loadChoices() {
        this.answers.forEach(answer => {
            if (answer.choiceId) { // Assurez-vous que choice et choice.id existent
                this.choiceService.findById(Number(answer.choiceId)).subscribe((choices: Choice) => { // Corrigé ici
                        if (choices) {
                            this.choices.push(choices); // Ajoutez le choix valide
                            console.log(`Choix récupéré pour la réponse ${answer.id}:`, choices); // Log du choix récupéré
                        } else {
                            console.warn(`Réponse ${answer.id} n'a pas de choix valide.`);
                        }
                    },
                    error => {
                        console.error(`Erreur lors du chargement du choix pour la réponse ${answer.id}:`, error);
                    });
            } else {
                console.warn(`Réponse ${answer.id} n'a pas de choix associé.`);
            }
        });
    }




    /*
        loadChoices(): void {
            this.choiceService.findAll().subscribe((data: Choice[]) => {
                this.choices = data; // Stocker tous les choix

                // Filtrer les choix pour chaque réponse
                this.answers.forEach(answer => {
                    const filteredChoices = this.choices.filter(choice => choice.id === answer.choice.id);
                    console.log(`Choix filtrés pour la réponse ${answer.id}:`, filteredChoices);
                    // Tu peux faire ce que tu veux avec les choix filtrés ici
                });
            }, error => {
                console.error('Erreur lors de la récupération des choix:', error);
            });
        }
    */



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
