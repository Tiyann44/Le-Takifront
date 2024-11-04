import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { Theme } from "models/theme.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  constructor(private http: HttpClient) {
  }

  private themeURL = "http://localhost:8080/api/themes"

  findAll(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.themeURL)
  }

  findById(id: number): Observable<Theme> {
    return this.http.get<Theme>(`${this.themeURL}/${id}`)
  }

  update(id: number, student: Theme): Observable<Theme> {
    return this.http.post<Theme>(`${this.themeURL}/${id}`, student)
  }

  create(Theme: Theme): Observable<Theme> {
    return this.http.post<Theme>(this.themeURL, Theme)
  }

  deleteById(id: number) {
    return this.http.delete(`${this.themeURL}/${id}`)
  }
}
