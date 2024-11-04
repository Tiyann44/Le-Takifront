import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-modal',
  templateUrl: './quiz-modal.component.html',
  styleUrls: ['./quiz-modal.component.scss']
})
export class QuizModalComponent {
  @Output() close = new EventEmitter<void>();
  quiz = { title: '', theme: '', description: '', image: '' };

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    console.log('Quiz ajouté:', this.quiz);
    this.closeModal();
  }
}
