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
    quizId: 0,
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
    }
  }

  loadQuizzes() {
    this.quizService.findAll().subscribe((quizzes) => {
      this.quizzes = quizzes;
      this.setQuizSelection();
    });
  }

  setQuizSelection() {
    console.log('quizId avant la sélection:', this.question.quizId);
    const selectedQuiz = this.quizzes.find(quiz => quiz.id === this.question.quizId);
    if (selectedQuiz) {
      this.question.quizId = this.question.quizId;
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
    this.question.answers.forEach(answer => {
      if (answer.choice.id) {
        this.choiceService.update(answer.choice.id, answer.choice).subscribe(() => {
          console.log(`Choix ${answer.choice.id} mis à jour avec succès`);
        }, error => {
          console.error(`Erreur lors de la mise à jour du choix ${answer.choice.id}:`, error);
        });
      }
      if (answer.id) {
        this.answerService.update(answer.id, answer).subscribe(() => {
          console.log(`Answer ${answer.id} mis à jour avec succès`);
        }, error => {
          console.error(`Erreur lors de la mise à jour de l'answer ${answer.id}:`, error);
        });
      }
    });

    this.questionService.update(Number(this.question.id), this.question).subscribe(() => {
      console.log('Question mise à jour avec succès');
      this.closeModal();
    }, error => {
      console.error('Erreur lors de la mise à jour de la question:', error);
    });
  }


  closeModal() {
    this.close.emit();
  }
}
