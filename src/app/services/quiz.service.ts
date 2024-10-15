import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Quiz } from "models/quiz.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn: "root",
})
export class QuizService {
    constructor(private http: HttpClient) {
    }

    private QuizURL = "http://localhost:8080/api/quizzes"

    findAll(): Observable<Quiz[]> {
        return this.http.get<Quiz[]>(this.QuizURL)
    }

    findById(id: number): Observable<Quiz> {
        return this.http.get<Quiz>(`${this.QuizURL}/${id}`)
    }

    update(id: number, student: Quiz): Observable<Quiz> {
        return this.http.post<Quiz>(`${this.QuizURL}/${id}`, student)
    }

    create(Quiz: Quiz): Observable<Quiz> {
        return this.http.post<Quiz>(this.QuizURL, Quiz)
    }

    deleteById(Quiz: Quiz) {
        return this.http.delete(`${this.QuizURL}/${Quiz.id}`)
    }
}
