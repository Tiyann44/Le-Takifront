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

      if (!this.theme.name || !this.theme.description || !this.theme.image) {
          alert("Veuillez compléter tous les champs.");
          return;
      }

    this.themeService.create(this.theme).subscribe(
        (createdQuiz) => {
          console.log('Quiz ajouté:', createdQuiz);
          this.closeModal();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du quiz:', error);
        }
    );
    this.closeModal();
  }

}
