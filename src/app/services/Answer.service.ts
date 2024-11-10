import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Answer } from "models/answer.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn: "root",
})
export class AnswerService {
    constructor(private http: HttpClient) {
    }

    private AnswerURL = "http://localhost:8080/api/answers"

    findAll(): Observable<Answer[]> {
        return this.http.get<Answer[]>(this.AnswerURL)
    }

    findById(id: number): Observable<Answer> {
        return this.http.get<Answer>(`${this.AnswerURL}/${id}`)
    }

    update(id: number, answer: Answer): Observable<Answer> {
        return this.http.put<Answer>(`${this.AnswerURL}/${id}`, answer)
    }

    create(Answer: Answer): Observable<Answer> {
        return this.http.post<Answer>(this.AnswerURL, Answer)
    }

    deleteById(Answer: Answer) {
        return this.http.delete(`${this.AnswerURL}/${Answer.id}`)
    }

    getAnswersByQuestionId(questionId: number): Observable<Answer[]> {
        return this.http.get<Answer[]>(`${this.AnswerURL}/question/${questionId}`);
    }

}
