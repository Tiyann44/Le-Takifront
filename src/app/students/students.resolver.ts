import { Injectable } from "@angular/core"
import { Resolve } from "@angular/router"
import { Observable } from "rxjs"
import { Student } from "models/theme.model"
import { UserService } from "services/user.service"

@Injectable({
  providedIn: "root",
})
export class StudentsResolver implements Resolve<Student[]> {
  constructor(private studentService: UserService) {
  }

  resolve(): Observable<Student[]> {
    return this.studentService.findAll()
  }
}
