import { Component } from '@angular/core';

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

  themes = [
    { id: 1, title: 'Culture Générale', description: 'Quiz sur divers sujets', image: 'https://example.com/culture.jpg' }
  ];
  quizzes = [
    { id: 1, title: 'Histoire de l\'Art', theme: 'Culture Générale', description: 'Testez vos connaissances', image: 'https://example.com/art.jpg' }
  ];
  questions = [
    { id: 1, text: 'Qui a peint La Joconde ?', quiz: 'Histoire de l\'Art', answers: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Donatello'] }
  ];


  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  showEditPage(page: string) {
    this.currentEditPage = page;
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
}
