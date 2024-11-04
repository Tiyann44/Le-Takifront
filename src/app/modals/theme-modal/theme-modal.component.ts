import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-theme-modal',
  templateUrl: './theme-modal.component.html',
  styleUrls: ['./theme-modal.component.scss']
})
export class ThemeModalComponent {
  @Output() close = new EventEmitter<void>();
  theme = { title: '', description: '', image: '' };

  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    // Logique pour ajouter un thème
    console.log('Thème ajouté:', this.theme);
    this.closeModal();
  }
}
