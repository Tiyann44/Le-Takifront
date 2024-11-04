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
  isEditingTheme = false;
  isEditingQuiz = false;
  isEditingQuestion = false;
  editingTheme?: Theme;
  editingQuiz?: Quiz;
  editingQuestion?: Question;

  themes: Theme[] = [];
  quizzes: Quiz[] = [];
  questions: Question[] = [];

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
    if (type === 'theme') {
      this.showThemeModal = false;
      this.isEditingTheme = false; // Réinitialiser l'édition
      this.editingTheme = undefined; // Réinitialiser l'objet d'édition
    }
    if (type === 'quiz') {
      this.showQuizModal = false;
      this.isEditingQuiz = false; // Réinitialiser l'édition
      this.editingQuiz = undefined; // Réinitialiser l'objet d'édition
    }
    if (type === 'question') {
      this.showQuestionModal = false;
      this.isEditingQuestion = false; // Réinitialiser l'édition
      this.editingQuestion = undefined; // Réinitialiser l'objet d'édition
    }
  }

  // Méthodes d'édition
  editTheme(id: number) {
    this.isEditingTheme = true;
    this.editingTheme = this.themes.find(theme => theme.id === id);
  }

  deleteTheme(id: number) {
    /*this.themeService.deleteById(theme).subscribe(() => {
      this.themes = this.themes.filter(theme => theme.id !== id);
      console.log('Thème supprimé avec succès.');
    }, error => {
      console.error('Erreur lors de la suppression du thème:', error);
    });*/
  }

  editQuiz(id: number) {
    this.isEditingQuiz = true;
    this.editingQuiz = this.quizzes.find(quiz => quiz.id === id);
  }

  deleteQuiz(id: number) {
    /*this.quizService.delete(id).subscribe(() => {
      this.quizzes = this.quizzes.filter(quiz => quiz.id !== id);
      console.log('Quiz supprimé avec succès.');
    }, error => {
      console.error('Erreur lors de la suppression du quiz:', error);
    });*/
  }

  editQuestion(id: number) {
    this.isEditingQuestion = true;
    this.editingQuestion = this.questions.find(question => question.id === id);
  }

  deleteQuestion(id: number) {
   /* this.questionService.delete(id).subscribe(() => {
      this.questions = this.questions.filter(question => question.id !== id);
      console.log('Question supprimée avec succès.');
    }, error => {
      console.error('Erreur lors de la suppression de la question:', error);
    });*/
  }

  saveTheme(event: Event) {
    event.preventDefault();
    if (this.editingTheme) {
      this.themeService.update(this.editingTheme.id, this.editingTheme).subscribe(() => {
        this.loadThemes(); // Recharger les thèmes
        this.closeModal('theme');
      });
    }
  }

  saveQuiz(event: Event) {
    event.preventDefault();
    if (this.editingQuiz) {
      this.quizService.update(this.editingQuiz.id, this.editingQuiz).subscribe(() => {
        this.loadQuizzes(); // Recharger les quiz
        this.closeModal('quiz');
      });
    }
  }

  saveQuestion(event: Event) {
    event.preventDefault();
    if (this.editingQuestion) {
      this.questionService.update(Number(this.editingQuestion.id), this.editingQuestion).subscribe(() => {
        this.loadQuestions(); // Recharger les questions
        this.closeModal('question');
      });
    }
  }

  cancelEdit() {
    this.closeModal(this.currentEditPage);
  }

  protected readonly Number = Number;
}
