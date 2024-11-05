import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../../models/question.model";
import {QuestionService} from "../../services/question.service";
import {QuizService} from "../../services/quiz.service";
import {Quiz} from "../../models/quiz.model";

@Component({
  selector: 'epf-edit-question-modal',
  templateUrl: './edit-question-modal.component.html',
  styleUrls: ['./edit-question-modal.component.scss']
})
export class EditQuestionModalComponent implements OnInit {

 // @Input() question: Question; // On reçoit la question existante pour l'édition
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
    /*this.question.answers.forEach((answer, index) => {
      answer.isCorrect = index === selectedIndex;
    });*/
  }

  onSubmit() {
   /* this.questionService.update(this.question).subscribe(
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
