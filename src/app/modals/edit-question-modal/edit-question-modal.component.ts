import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Question} from "../../models/question.model";
import {QuestionService} from "../../services/question.service";
import {QuizService} from "../../services/quiz.service";
import {Quiz} from "../../models/quiz.model";

@Component({
  selector: 'app-edit-question-modal',
  templateUrl: './edit-question-modal.component.html',
  styleUrls: ['./edit-question-modal.component.scss']
})
export class EditQuestionModalComponent  {

  @Input() question: Question = {
    question: '',
    quizId: 0, // Remplacez par un ID de quiz valide si nécessaire
    answers: [
      { choice: { id: undefined, option: '' }, isCorrect: false }, // Choix initial
      { choice: { id: undefined, option: '' }, isCorrect: false },
      { choice: { id: undefined, option: '' }, isCorrect: false },
      { choice: { id: undefined, option: '' }, isCorrect: false }
    ]
  }; // On reçoit la question existante pour l'édition
  @Output() close = new EventEmitter<void>();
  quizzes: Quiz[] = [];

  constructor(
      private questionService: QuestionService,
      private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizService.findAll().subscribe((quizzes) => {
      this.quizzes = quizzes;
    });
  }

  onCorrectAnswerSelected(selectedIndex: number) {
    this.question.answers.forEach((answer, index) => {
      answer.isCorrect = index === selectedIndex;
    });
  }

  onSubmit() {
   /*this.questionService.update(this.question).subscribe(
        (updatedQuestion) => {
          console.log('Question mise à jour:', updatedQuestion);
          this.closeModal();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la question :', error);
        }
    );*/
  }

  closeModal() {
    this.close.emit();
  }

}
