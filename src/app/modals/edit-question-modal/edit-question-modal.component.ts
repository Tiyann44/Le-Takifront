import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Question } from "../../models/question.model";
import { QuestionService } from "../../services/question.service";
import { QuizService } from "../../services/quiz.service";
import { Quiz } from "../../models/quiz.model";
import {ChoiceService} from "../../services/choice.service";
import {AnswerService} from "../../services/Answer.service";

@Component({
  selector: 'app-edit-question-modal',
  templateUrl: './edit-question-modal.component.html',
  styleUrls: ['./edit-question-modal.component.scss']
})
export class EditQuestionModalComponent implements OnInit, OnChanges {

  @Input() question: Question = {
    question: '',
    quizId: 0, // ID de quiz par défaut
    answers: [
      { choice: { id: undefined, option: '' }, isCorrect: false },
      { choice: { id: undefined, option: '' }, isCorrect: false },
      { choice: { id: undefined, option: '' }, isCorrect: false },
      { choice: { id: undefined, option: '' }, isCorrect: false }
    ]
  };

  @Output() close = new EventEmitter<void>();
  quizzes: Quiz[] = [];

  constructor(
      private questionService: QuestionService,
      private quizService: QuizService,
      private choiceService: ChoiceService,
      private answerService: AnswerService
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'] && changes['question'].currentValue) {
      this.loadQuizzes();
      console.log('Question mise à jour:', this.question); // Debugging
    }
  }

  loadQuizzes() {
    this.quizService.findAll().subscribe((quizzes) => {
      this.quizzes = quizzes;
      console.log('Quizzes chargés:', this.quizzes);
      // Assurez-vous que setQuizSelection est appelé ici
      this.setQuizSelection();
    });
  }

  setQuizSelection() {
    console.log('quizId avant la sélection:', this.question.quizId);
    const selectedQuiz = this.quizzes.find(quiz => quiz.id === this.question.quizId);
    if (selectedQuiz) {
      this.question.quizId = this.question.quizId; // Ce que vous faites déjà
      console.log('Quiz sélectionné:', selectedQuiz);
    } else {
      console.log('Aucun quiz trouvé avec l\'ID de la question:', this.question.quizId);
    }
  }

  onCorrectAnswerSelected(selectedIndex: number) {
    this.question.answers.forEach((answer, index) => {
      answer.isCorrect = index === selectedIndex;
    });
  }

  onSubmit() {
    // Mettre à jour les choix de réponses
    this.question.answers.forEach(answer => {
      // Mise à jour de l'option du choix
      if (answer.choice.id) {
        this.choiceService.update(answer.choice.id, answer.choice).subscribe(() => {
          console.log(`Choix ${answer.choice.id} mis à jour avec succès`);
        }, error => {
          console.error(`Erreur lors de la mise à jour du choix ${answer.choice.id}:`, error);
        });
      }

      // Mise à jour de la propriété isCorrect dans l'answer
      if (answer.id) { // Assurez-vous que l'answer a un ID
        this.answerService.update(answer.id, answer).subscribe(() => {
          console.log(`Answer ${answer.id} mis à jour avec succès`);
        }, error => {
          console.error(`Erreur lors de la mise à jour de l'answer ${answer.id}:`, error);
        });
      }
    });

    // Ensuite, mettez à jour la question elle-même
    this.questionService.update(Number(this.question.id), this.question).subscribe(() => {
      console.log('Question mise à jour avec succès');
      this.closeModal();
      // Autres actions, comme fermer le modal ou rafraîchir les données
    }, error => {
      console.error('Erreur lors de la mise à jour de la question:', error);
    });
  }


  closeModal() {
    this.close.emit();
  }
}
