import { Component, EventEmitter, Output } from '@angular/core';
import { QuestionService } from "../../services/question.service";
import { AnswerService } from "../../services/Answer.service";
import { ChoiceService } from "../../services/choice.service";
import { Question } from "../../models/question.model";
import { Quiz } from "../../models/quiz.model";
import { QuizService } from "../../services/quiz.service";
import { forkJoin, from } from 'rxjs';
import { switchMap, concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent {
  @Output() close = new EventEmitter<void>();
  quizzes: Quiz[] = [];
  question: Question = {
    question: '',
    quizId: 0,
    answers: [
      { choice: { id: undefined, option: '' }, isCorrect: false },
      { choice: { id: undefined, option: '' }, isCorrect: false },
      { choice: { id: undefined, option: '' }, isCorrect: false },
      { choice: { id: undefined, option: '' }, isCorrect: false }
    ],
    image: '',
  };

  constructor(
      private questionService: QuestionService,
      private quizService: QuizService,
      private answerService: AnswerService,
      private choiceService: ChoiceService,
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizService.findAll().subscribe((quizzes) => {
      this.quizzes = quizzes;
      console.log('Quizzes chargés:', quizzes);
    });
  }

  onCorrectAnswerSelected(selectedIndex: number) {
    this.question.answers.forEach((answer, index) => {
      answer.isCorrect = index === selectedIndex;
    });
    console.log(`Réponse correcte sélectionnée à l'index ${selectedIndex}`, this.question.answers);
  }

  onSubmit() {
    console.log('Données de la question avant enregistrement :', this.question);

    const allAnswersFilled = this.question.answers.every(answer => answer.choice.option.trim() !== '');
    const hasCorrectAnswer = this.question.answers.some(answer => answer.isCorrect);

    if (
        !this.question.question.trim() ||
        !this.question.quizId ||
        !allAnswersFilled ||
        !hasCorrectAnswer
    ) {
      alert("Veuillez compléter tous les champs.");
      return;
    }

    // Étape 1 : Créer la question
    this.questionService.create(this.question).pipe(
        tap(questionResponse => {
          console.log('Question enregistrée avec succès !', questionResponse);

          // Mise à jour de l'ID de la question dans chaque réponse
          this.question.answers.forEach(answer => {
            answer.questionId = questionResponse.id;
          });
        }),
        // Étape 2 : Créer chaque choix pour les réponses
        switchMap(() => this.createChoicesAndAnswers())
    ).subscribe({
      complete: () => {
        console.log('Toutes les réponses et leurs choix associés ont été créés.');
        this.closeModal();
      },
      error: (error) => {
        console.error('Erreur lors de l\'enregistrement des réponses et choix :', error);
      }
    });
  }

  // Créer les choix et ensuite les réponses associées
  private createChoicesAndAnswers() {
    return from(this.question.answers).pipe(
        concatMap(answer =>
            // Créer le choix pour chaque réponse
            this.choiceService.create(answer.choice).pipe(
                tap(choiceResponse => {
                  console.log('Choix enregistré avec succès !', choiceResponse);

                  // Assigner le `choiceId` de l'answer pour lier à ce choix créé
                  answer.choiceId = choiceResponse.id;
                }),
                // Ensuite, créer l'answer avec le `choiceId` mis à jour
                switchMap(() => this.answerService.create(answer))
            )
        )
    );
  }

  closeModal() {
    this.close.emit();
  }
}
