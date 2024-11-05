import { Component, EventEmitter, Output } from '@angular/core';
import {ThemeService} from "../../services/theme.service";
import {Theme} from "../../models/theme.model";


@Component({
  selector: 'app-theme-modal',
  templateUrl: './theme-modal.component.html',
  styleUrls: ['./theme-modal.component.scss']
})
export class ThemeModalComponent {
  @Output() close = new EventEmitter<void>();

  theme: Theme = { id: null, name: '', description: '', image: '', quizzes: [] };

  constructor(private themeService: ThemeService) { }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    this.themeService.create(this.theme).subscribe(
        (createdQuiz) => {
          console.log('Quiz ajouté:', createdQuiz);
          this.closeModal(); // Ferme le modal après l'ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du quiz:', error);
        }
    );
    this.closeModal();
  }

}