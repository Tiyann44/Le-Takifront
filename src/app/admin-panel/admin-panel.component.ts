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

  ) {this.loadThemes();
    this.loadQuizzes();
    this.loadQuestions();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.loadThemes();
    this.loadQuizzes();
    this.loadQuestions();
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
      this.questions.forEach(question => {
        question.answers = [];
        this.answerService.getAnswersByQuestionId(Number(question.id)).subscribe((answers: Answer[]) => {
          question.answers = answers;
          question.answers.forEach(currentAnswer => {
            this.choiceService.findById(Number(currentAnswer.choiceId)).subscribe((choice: Choice) => {
              currentAnswer.choice = choice;
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
    this.isEditQuestionModalOpen = true;
    this.editingQuestion = question;
  }

  openEditQuizModal(quiz: Quiz) {
        this.isEditQuizModalOpen = true;
        this.editingQuiz = quiz;
  }

  openEditThemeModal(theme: Theme) {
        this.isEditThemeModalOpen = true;
        this.editingTheme = theme;

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

  deleteTheme(id: number) {
    this.quizService.findAll().subscribe((data: Quiz[]) => {
      const quizzesToDelete = data.filter(quiz => Number(quiz.themeId) === id);
      console.log('Quizzes à supprimer:', quizzesToDelete);

      if (quizzesToDelete.length === 0) {
        this.themeService.deleteById(id).subscribe(() => {
          this.themes = this.themes.filter(theme => theme.id !== id);
          console.log('Thème supprimé avec succès (aucun quiz à supprimer).');
        }, error => {
          console.error('Erreur lors de la suppression du thème:', error);
        });
      } else {
        quizzesToDelete.forEach(quiz => {
          this.deleteQuiz(Number(quiz.id));
        });
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
        this.quizService.deleteById(id).subscribe(() => {
          this.quizzes = this.quizzes.filter(quiz => quiz.id !== id);
          console.log('Quiz supprimé avec succès (aucune question à supprimer).');
        }, error => {
          console.error('Erreur lors de la suppression du quiz:', error);
        });
      } else {
        questionsToDelete.forEach(question => {
          this.deleteQuestion(Number(question.id));
        });
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
        this.loadThemes();
        this.closeModal('theme');
      });
    }
  }

  saveQuiz(event: Event) {
    event.preventDefault();
    if (this.editingQuiz) {
      this.quizService.update(Number(this.editingQuiz.id), this.editingQuiz).subscribe(() => {
        this.loadQuizzes();
        this.closeModal('quiz');
      });
    }
  }

  saveQuestion(event: Event) {
    event.preventDefault();
    if (this.editingQuestion) {
      this.questionService.update(Number(this.editingQuestion.id), this.editingQuestion).subscribe(() => {
        this.loadQuestions();
        this.closeModal('question');
      });
    }
  }

  cancelEdit() {
    this.closeModal(this.currentEditPage);
  }

  protected readonly Number = Number;
}

