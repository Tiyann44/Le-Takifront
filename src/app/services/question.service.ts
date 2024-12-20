import { Injectable } from "@angular/core"
import {Observable, tap} from "rxjs"
import { Question } from "models/question.model"
import { HttpClient } from "@angular/common/http"
import {Answer} from "../models/answer.model";
import {Choice} from "../models/choice.model";

@Injectable({
    providedIn: "root",
})
export class QuestionService {
    constructor(private http: HttpClient) {
    }

    private QuestionURL = "http://localhost:8080/api/questions"

    findAll(): Observable<Question[]> {
        return this.http.get<Question[]>(this.QuestionURL)
    }

    findAnswersByQuestionId(questionId: number): Observable<Answer[]> {
        return this.http.get<Answer[]>(`${this.QuestionURL}/${questionId}/answers`).pipe(
            tap(data => {
                console.log(`Réponses récupérées pour la question ${questionId}:`, data);
            }),
        );
    }

    findChoicesByAnswerId(answerId: number): Observable<Choice[]> {
        return this.http.get<Choice[]>(`${this.QuestionURL}/answers/${answerId}/choices`);
    }


    getQuestionsByQuizId(quizId: number): Observable<Question[]> {
        return this.http.get<Question[]>(`${this.QuestionURL}/${quizId}`);
    }


    findById(id: number): Observable<Question> {
        return this.http.get<Question>(`${this.QuestionURL}/${id}`)
    }

    findByQuizId(quizId: number): Observable<Question[]> {
        return this.http.get<Question[]>(`${this.QuestionURL}/quiz/${quizId}`);
    }


    update(id: number, question: Question): Observable<Question> {
        return this.http.put<Question>(`${this.QuestionURL}/${id}`, question);
    }

    create(Question: Question): Observable<Question> {
        return this.http.post<Question>(this.QuestionURL, Question)
    }

    deleteById(id: number) {
        return this.http.delete(`${this.QuestionURL}/${id}`)
    }
}
