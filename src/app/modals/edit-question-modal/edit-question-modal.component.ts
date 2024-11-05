import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Question } from "../../models/question.model";
import { QuestionService } from "../../services/question.service";
import { QuizService } from "../../services/quiz.service";
import { Quiz } from "../../models/quiz.model";

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
      private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question'] && changes['question'].currentValue) {
      this.loadQuizzes(); // Charger les quizzes avant de préremplir les informations
    }
  }

  loadQuizzes() {
    this.quizService.findAll().subscribe((quizzes) => {
      this.quizzes = quizzes;
      console.log('Quizzes chargés:', this.quizzes); // Vérifiez ici les quizzes chargés
      this.setQuizSelection();
    });
  }

  setQuizSelection() {
    // Si la question a un quizId, sélectionnez ce quiz par défaut
    if (this.question.quizId) {
      const selectedQuiz = this.quizzes.find(quiz => quiz.id === this.question.quizId);
      if (selectedQuiz) {
        if (selectedQuiz.id != null) {
          this.question.quizId = selectedQuiz.id;
        }
      }
    }
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
