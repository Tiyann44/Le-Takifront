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
  isAddThemeModalOpen = false;
  isAddQuizModalOpen = false;
  isAddQuestionModalOpen = false;
  currentEditPage: string = '';
  isEditThemeModalOpen = false;
  isEditQuizModalOpen = false;
  isEditQuestionModalOpen = false;
  editingTheme: Theme | null = null;
  editingQuiz: Quiz | null = null;
  editingQuestion: Question | null = null;

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
    this.loadThemes();  // Charger les thèmes
    this.loadQuizzes(); // Charger les quiz
    this.loadQuestions(); // Charger les questions
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
    if (type === 'add-theme') this.isAddThemeModalOpen = true;
    if (type === 'add-quiz') this.isAddQuizModalOpen = true;
    if (type === 'add-question') this.isAddQuestionModalOpen = true;
    if (type === 'edit-theme') this.isEditThemeModalOpen = true;
  }

  openEditQuestionModal(question: Question) {
    this.isEditQuestionModalOpen = true; // Ouvre le modal
    this.editingQuestion = question; // Assignation de la question à modifier
  }

  openEditQuizModal(quiz: Quiz) {
        this.isEditQuizModalOpen = true; // Ouvre le modal
        this.editingQuiz = quiz; // Assignation du quiz à modifier
  }

  openEditThemeModal(theme: Theme) {
        this.isEditThemeModalOpen = true; // Ouvre le modal
        this.editingTheme = theme; // Assignation du thème à modifier

  }

  closeModal(type: string) {
    if (type === 'add-theme') {
      this.isAddThemeModalOpen = false;
    }
    if (type === 'add-quiz') {
      this.isAddQuizModalOpen = false;
    }
    if (type === 'add-question') {
      this.isAddQuestionModalOpen = false;
    }
    if (type === 'edit-theme') {
      this.isEditThemeModalOpen = false;
      this.editingTheme = null;
    }
    if (type === 'edit-quiz') {
      this.isEditQuizModalOpen = false;
      this.editingQuiz = null;
    }
    if (type === 'edit-question') {
      this.isEditQuestionModalOpen = false;
      this.editingQuestion = null;
    }
  }


// Méthodes d'édition
  deleteTheme(id: number) {
    this.quizService.findAll().subscribe((data: Quiz[]) => {
      const quizzesToDelete = data.filter(quiz => Number(quiz.themeId) === id);
      console.log('Quizzes à supprimer:', quizzesToDelete);

      if (quizzesToDelete.length === 0) {
        // Supprimer le thème directement s'il n'y a pas de quizzes associés
        this.themeService.deleteById(id).subscribe(() => {
          this.themes = this.themes.filter(theme => theme.id !== id);
          console.log('Thème supprimé avec succès (aucun quiz à supprimer).');
        }, error => {
          console.error('Erreur lors de la suppression du thème:', error);
        });
      } else {
        // Supprimer les quizzes associés, puis le thème
        quizzesToDelete.forEach(quiz => {
          this.deleteQuiz(Number(quiz.id)); // Supprime chaque quiz
        });
        // Après la suppression de tous les quizzes, supprimer le thème
        this.themeService.deleteById(id).subscribe(() => {
          this.themes = this.themes.filter(theme => theme.id !== id);
          console.log('Thème supprimé avec succès.');
        }, error => {
          console.error('Erreur lors de la suppression du thème:', error);
        });
      }
    });
  }

  deleteQuiz(id: number) {
    this.questionService.findAll().subscribe((data: Question[]) => {
      const questionsToDelete = data.filter(question => Number(question.quizId) === id);
      console.log('Questions à supprimer:', questionsToDelete);

      if (questionsToDelete.length === 0) {
        // Supprimer le quiz directement s'il n'y a pas de questions associées
        this.quizService.deleteById(id).subscribe(() => {
          this.quizzes = this.quizzes.filter(quiz => quiz.id !== id);
          console.log('Quiz supprimé avec succès (aucune question à supprimer).');
        }, error => {
          console.error('Erreur lors de la suppression du quiz:', error);
        });
      } else {
        // Supprimer les questions associées, puis le quiz
        questionsToDelete.forEach(question => {
          this.deleteQuestion(Number(question.id)); // Supprime chaque question
        });
        // Après la suppression de toutes les questions, supprimer le quiz
        this.quizService.deleteById(id).subscribe(() => {
          this.quizzes = this.quizzes.filter(quiz => quiz.id !== id);
          console.log('Quiz supprimé avec succès.');
        }, error => {
          console.error('Erreur lors de la suppression du quiz:', error);
        });
      }
    });
  }

  deleteQuestion(id: number) {
    console.log('Tentative de suppression de la question avec ID:', id);
    this.questionService.deleteById(id).subscribe(() => {
      this.questions = this.questions.filter(question => question.id !== id);
      console.log('Question supprimée avec succès.');
    }, error => {
      console.error('Erreur lors de la suppression de la question:', error);
    });
  }

  saveTheme(event: Event) {
    event.preventDefault();
    if (this.editingTheme) {
      this.themeService.update(Number(this.editingTheme.id), this.editingTheme).subscribe(() => {
        this.loadThemes(); // Recharger les thèmes
        this.closeModal('theme');
      });
    }
  }

  saveQuiz(event: Event) {
    event.preventDefault();
    if (this.editingQuiz) {
      this.quizService.update(Number(this.editingQuiz.id), this.editingQuiz).subscribe(() => {
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

