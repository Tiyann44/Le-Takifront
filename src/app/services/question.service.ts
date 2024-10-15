import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Question } from "models/question.model"
import { HttpClient } from "@angular/common/http"

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

    findById(id: number): Observable<Question> {
        return this.http.get<Question>(`${this.QuestionURL}/${id}`)
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
