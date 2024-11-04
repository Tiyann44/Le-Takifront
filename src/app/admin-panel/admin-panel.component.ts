import { Component } from '@angular/core';
import {QuestionService} from "../services/question.service";
import {QuizService} from "../services/quiz.service";
import {ThemeService} from "../services/theme.service";
import {Answer} from "../models/answer.model";
import {Choice} from "../models/choice.model";
import {AnswerService} from "../services/Answer.service";
import {Question} from "../models/question.model";
import {Quiz} from "../models/quiz.model";
import {Theme} from "../models/theme.model";
import {ChoiceService} from "../services/choice.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  activeTab: string = 'themes';
  showThemeModal = false;
  showQuizModal = false;
  showQuestionModal = false;
  currentEditPage: string = '';

  themes: Theme[] = [];
  quizzes: Quiz[] = [];
  questions: Question[] = [];
  answers: Answer[] = [];
  choices: Choice[] = [];

  constructor(
      private themeService: ThemeService,
      private quizService: QuizService,
      private questionService: QuestionService,
      private answerService: AnswerService,
        private choiceService: ChoiceService

  ) {this.loadThemes();  // Charger les thèmes
    this.loadQuizzes(); // Charger les quiz
    this.loadQuestions(); // Charger les questions
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  showEditPage(page: string) {
    this.currentEditPage = page;
  }

  loadThemes() {
    this.themeService.findAll().subscribe((themes) => {
      this.themes = themes;
        console.log('Thèmes chargés:', themes); // Vérifiez ce que vous recevez
    });
  }

  loadQuizzes() {
    this.quizService.findAll().subscribe((quizzes) => {
      this.quizzes = quizzes;
      console.log('Quizzes chargés:', quizzes); // Vérifiez ce que vous recevez
    });
  }

  loadQuestions() {
    this.questionService.findAll().subscribe((questions) => {
      this.questions = questions;
      console.log('Questions chargées:', questions);
      // Pour chaque question, chargez les réponses associées
      this.questions.forEach(question => {
        // Créez une propriété pour stocker les réponses de chaque question
        question.answers = []; // Initialisez un tableau pour les réponses spécifiques à la question
        this.answerService.getAnswersByQuestionId(Number(question.id)).subscribe((answers: Answer[]) => {
          question.answers = answers; // Associez les réponses à la question
          // Chargez les choix pour chaque réponse
          question.answers.forEach(currentAnswer => {
            this.choiceService.findById(Number(currentAnswer.choiceId)).subscribe((choice: Choice) => {
              currentAnswer.choice = choice; // Associez le choix à la réponse
            });
          });
        }, error => {
          console.error('Erreur lors du chargement des réponses:', error);
        });
      });
    });
  }

  showModal(type: string) {
    if (type === 'theme') this.showThemeModal = true;
    if (type === 'quiz') this.showQuizModal = true;
    if (type === 'question') this.showQuestionModal = true;
  }

  closeModal(type: string) {
    if (type === 'theme') this.showThemeModal = false;
    if (type === 'quiz') this.showQuizModal = false;
    if (type === 'question') this.showQuestionModal = false;
  }

  editTheme(id: number) { /* logiques d'édition */ }
  deleteTheme(id: number) { /* logiques de suppression */ }
  editQuiz(id: number) { /* logiques d'édition */ }
  deleteQuiz(id: number) { /* logiques de suppression */ }
  editQuestion(id: number) { /* logiques d'édition */ }
  deleteQuestion(id: number) { /* logiques de suppression */ }

  protected readonly Number = Number;
}
