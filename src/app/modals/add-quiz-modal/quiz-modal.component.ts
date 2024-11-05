import { Component, EventEmitter, Output } from '@angular/core';
import {Theme} from "../../models/theme.model";
import {Quiz} from "../../models/quiz.model";
import {ThemeService} from "../../services/theme.service";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-quiz-modal',
  templateUrl: './quiz-modal.component.html',
  styleUrls: ['./quiz-modal.component.scss']
})
export class QuizModalComponent {
  @Output() close = new EventEmitter<void>();
  quiz: Quiz = { id: null, name: '', description: '', themeName: '', image: '', theme: null, themeId: null };
  themes: Theme[] = [];

  constructor(private themeService: ThemeService, private quizService: QuizService) { }

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
    this.quizService.create(this.quiz).subscribe(
        (createdQuiz) => {
          console.log('Quiz ajouté:', createdQuiz);
          this.closeModal(); // Ferme le modal après l'ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du quiz:', error);
        }
    );
  }
}
