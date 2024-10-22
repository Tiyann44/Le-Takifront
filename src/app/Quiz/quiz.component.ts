import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'services/question.service'; // Assurez-vous que le chemin est correct
import { QuizService } from 'services/quiz.service'; // Assurez-vous que le chemin est correct
import { Question } from 'models/question.model'; // Assurez-vous que le chemin est correct
import { Quiz } from 'models/quiz.model'; // Assurez-vous que le chemin est correct

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
    quizId: bigint | null = null;
    quiz: Quiz | null = null;
    questions: Question[] = [];

    constructor(
        private route: ActivatedRoute,
        private questionService: QuestionService,
        private quizService: QuizService // Ajoutez le service Quiz si nécessaire
    ) {}

    ngOnInit(): void {
        this.quizId = BigInt(this.route.snapshot.paramMap.get('id') || '0');
        this.loadQuiz();
        this.loadQuestions();
    }

    loadQuiz(): void {
        if (this.quizId !== null) {
            this.quizService.findById(Number(this.quizId)).subscribe((quiz: Quiz) => {
                this.quiz = quiz; // Assurez-vous que le quiz est assigné
            });
        }
    }

    loadQuestions(): void {
        if (this.quizId !== null) {
            this.questionService.findByQuizId(Number(this.quizId)).subscribe((questions: Question[]) => {
                this.questions = questions; // Assurez-vous que les questions sont assignées
            });
        }
    }
}
