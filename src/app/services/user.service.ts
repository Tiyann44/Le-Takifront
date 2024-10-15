import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { User } from "models/user.model"
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  private userURL = "http://localhost:8080/api/users"

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL)
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userURL}/${id}`)
  }

  findByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.userURL}/${email}`)
  }


  update(id: number, student: User): Observable<User> {
    return this.http.post<User>(`${this.userURL}/${id}`, student)
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.userURL, user)
  }

  deleteById(user: User) {
    return this.http.delete(`${this.userURL}/${user.id}`)
  }
  deleteByEmail(user: User) {
    return this.http.delete(`${this.userURL}/${user.id}`)
  }
}
