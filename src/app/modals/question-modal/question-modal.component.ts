import { Component, EventEmitter, Output } from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {Question} from "../../models/question.model";

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent {
  @Output() close = new EventEmitter<void>();
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

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    // Initialisation si nécessaire
  }

  onSubmit() {
    this.questionService.create(this.question).subscribe(() => {
      this.closeModal();
    });
  }

  closeModal() {
    // Logique pour fermer le modal
  }
}
