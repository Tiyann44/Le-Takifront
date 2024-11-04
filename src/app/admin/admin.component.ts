import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';  // Importez votre service pour gérer les thèmes
import { QuizService } from '../services/quiz.service';    // Importez votre service pour gérer les quiz
import { QuestionService } from '../services/question.service'; // Importez votre service pour gérer les questions

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  themes: any[] = [];
  quizzes: any[] = [];
  questions: any[] = [];
  selectedTab: string = 'themes';
  activeTab: string = 'themes';

  constructor(
      private themeService: ThemeService,
      private quizService: QuizService,
      private questionService: QuestionService

  ) {}

  ngOnInit() {
    this.loadThemes();
    this.loadQuizzes();
    this.loadQuestions();
  }

  loadThemes() {
    this.themeService.findAll().subscribe((themes) => {
      this.themes = themes;
    });
  }

  loadQuizzes() {
    this.quizService.findAll().subscribe((quizzes) => {
      this.quizzes = quizzes;
    });
  }

  loadQuestions() {
    this.questionService.findAll().subscribe((questions) => {
      this.questions = questions;
    });
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  showModal(type: string) {
    // Logic to show modal for adding/editing themes, quizzes, or questions
  }

  editTheme(theme: any) {
    // Logic for editing a theme
  }

  deleteTheme(id: number) {
    // Logic for deleting a theme
  }

  editQuiz(quiz: any) {
    // Logic for editing a quiz
  }

  deleteQuiz(id: number) {
        // Logic for deleting a quiz
  }

  editQuestion(question: any) {
        // Logic for editing a question
  }

  deleteQuestion(id: number) {
        // Logic for deleting a question
  }
  // Ajoutez des méthodes pour gérer les quizzes et les questions
}
