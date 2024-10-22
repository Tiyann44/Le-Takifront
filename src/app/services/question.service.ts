import { Injectable } from "@angular/core"
import {map, Observable} from "rxjs"
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

    findAnswersByQuestionId(quizId: number): Observable<Answer[]> {
        return this.http.get<Answer[]>(`${this.QuestionURL}/${quizId}`);
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


    update(id: number, student: Question): Observable<Question> {
        return this.http.post<Question>(`${this.QuestionURL}/${id}`, student)
    }

    create(Question: Question): Observable<Question> {
        return this.http.post<Question>(this.QuestionURL, Question)
    }

    deleteById(Question: Question) {
        return this.http.delete(`${this.QuestionURL}/${Question.id}`)
    }
}
