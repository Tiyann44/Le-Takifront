import { Component, EventEmitter, Output } from '@angular/core';
import {Theme} from "../../models/theme.model";
import {Quiz} from "../../models/quiz.model";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-quiz-modal',
  templateUrl: './quiz-modal.component.html',
  styleUrls: ['./quiz-modal.component.scss']
})
export class QuizModalComponent {
  @Output() close = new EventEmitter<void>();
  quiz: Quiz = { id: null, name: '', description: '', themeName: '', image: '', theme: null, themeId: null };
  themes: Theme[] = [];

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.loadThemes();
  }

  loadThemes() {
    this.themeService.findAll().subscribe((themes) => {
      this.themes = themes;
    });
  }
  closeModal() {
    this.close.emit();
  }

  onSubmit() {
    console.log('Quiz ajouté:', this.quiz);
    this.closeModal();
  }
}
