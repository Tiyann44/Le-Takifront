import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../models/theme.model';

@Component({
  selector: 'app-edit-theme-modal',
  templateUrl: './edit-theme-modal.component.html',
  styleUrls: ['./edit-theme-modal.component.scss']
})
export class EditThemeModalComponent {
  @Input() theme: Theme = { id: null, name: '', description: '', image: '', quizzes: [] };
  @Output() close = new EventEmitter<void>();

  constructor(private themeService: ThemeService) { }

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    /*this.themeService.update(this.theme).subscribe(
        (updatedTheme) => {
          console.log('Thème mis à jour:', updatedTheme);
          this.closeModal(); // Ferme le modal après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du thème:', error);
        }
    );*/
  }
}
