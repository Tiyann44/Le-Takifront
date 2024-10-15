import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Choice } from "models/choice.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn: "root",
})
export class ChoiceService {
    constructor(private http: HttpClient) {
    }

    private ChoiceURL = "http://localhost:8080/choices"

    findAll(): Observable<Choice[]> {
        return this.http.get<Choice[]>(this.ChoiceURL)
    }

    findById(id: number): Observable<Choice> {
        return this.http.get<Choice>(`${this.ChoiceURL}/${id}`)
    }

    update(id: number, student: Choice): Observable<Choice> {
        return this.http.post<Choice>(`${this.ChoiceURL}/${id}`, student)
    }

    create(Choice: Choice): Observable<Choice> {
        return this.http.post<Choice>(this.ChoiceURL, Choice)
    }

    deleteById(Choice: Choice) {
        return this.http.delete(`${this.ChoiceURL}/${Choice.id}`)
    }
}