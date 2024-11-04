import { Component, EventEmitter, Output } from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {Question} from "../../models/question.model";
import {Quiz} from "../../models/quiz.model";
import {QuizService} from "../../services/quiz.service";

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
    quizId: 0, // Remplacez par un ID de quiz valide si nécessaire
    answers: [
      { choice: { id: undefined, option: '' }, isCorrect: false }, // Choix initial
      { choice: { id: undefined, option: '' }, isCorrect: false },
      { choice: { id: undefined, option: '' }, isCorrect: false },
      { choice: { id: undefined, option: '' }, isCorrect: false }
    ]
  };

  constructor(
      private questionService: QuestionService,
        private quizService: QuizService,
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizService.findAll().subscribe((quizzes) => {
      this.quizzes = quizzes;
      console.log('Quizzes chargés:', quizzes); // Vérifiez ce que vous recevez
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

    // Envoi de la question au backend via le service
    this.questionService.create(this.question).subscribe(
        (response) => {
          console.log('Question enregistrée avec succès !', response);
          this.closeModal();
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement de la question :', error);
        }
    );
  }

  closeModal() {
    this.close.emit();
  }
}
