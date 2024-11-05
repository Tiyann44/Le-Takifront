import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Quiz} from "../../models/quiz.model";
import {Theme} from "../../models/theme.model";
import {ThemeService} from "../../services/theme.service";
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-edit-quiz-modal',
  templateUrl: './edit-quiz-modal.component.html',
  styleUrls: ['./edit-quiz-modal.component.scss']
})
export class EditQuizModalComponent {

  @Input()
  quiz: Quiz = { id: null, name: '', description: '', themeName: '', image: '', theme: null, themeId: null };
  @Output() close = new EventEmitter<void>();
  themes: Theme[] = [];

  constructor(
      private themeService: ThemeService,
      private quizService: QuizService
  ) {}

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
    /*this.quizService.update(this.quiz).subscribe(
        (updatedQuiz) => {
          console.log('Quiz mis à jour:', updatedQuiz);
          this.closeModal(); // Ferme le modal après la mise à jour
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du quiz:', error);
        }
    );*/
  }

}
