import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Score } from "models/score.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class ScoreService {
  constructor(private http: HttpClient) {
  }

  private ScoreURL = "http://localhost:8080/api/scores"

  findAll(): Observable<Score[]> {
    return this.http.get<Score[]>(this.ScoreURL)
  }

  findById(id: number): Observable<Score> {
    return this.http.get<Score>(`${this.ScoreURL}/${id}`)
  }

  update(id: number, student: Score): Observable<Score> {
    return this.http.post<Score>(`${this.ScoreURL}/${id}`, student)
  }

  create(Score: Score): Observable<Score> {
    return this.http.post<Score>(this.ScoreURL, Score)
  }

  deleteById(Score: Score) {
    return this.http.delete(`${this.ScoreURL}/${Score.id}`)
  }
}
