import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent {
  @Output() close = new EventEmitter<void>();
  question = { text: '', quiz: '', answers: [''] };

  closeModal() {
    this.close.emit();
  }

  addAnswer() {
    this.question.answers.push('');
  }

  onSubmit() {
    console.log('Question ajoutée:', this.question);
    this.closeModal();
  }
}
