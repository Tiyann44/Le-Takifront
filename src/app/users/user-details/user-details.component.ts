import { Component, OnInit } from "@angular/core"
import { map, Observable } from "rxjs"
import { User } from "models/user.model"
import { ActivatedRoute, Router } from "@angular/router"
import { Question } from "models/question.model"
import { QuestionService } from "services/question.service"
import { UserService } from "services/user.service"
import { Score } from "models/score.model"
import { ScoreService } from "services/score.service"

@Component({
  selector: "epf-User-details",
  templateUrl: "./User-details.component.html",
  styleUrls: ["./User-details.component.scss"],
})
export class UserDetailsComponent {
  User$: Observable<User> = this._route.data.pipe(map((data) => data["User"]))
  allScores$: Observable<Score[]> | undefined
  allQuestions$: Observable<Question[]> | undefined
  ScoreSelectModel: Score | null = null
  QuestionSelectModel: Question | null = null
  notSelectedQuestion: boolean | undefined
  today = new Date(Date.now())

  constructor(
    private _route: ActivatedRoute,
    private QuestionService: QuestionService,
    private UserService: UserService,
    private ScoreService: ScoreService,
    private router: Router,
  ) {
    this.allScores$ = this.ScoreService.findAll()
  }

  QuestionClick() {
    this.allQuestions$ = this.QuestionService.findAll()
  }

  /*addQuestionToUser(User: User) {
    if (this.QuestionSelectModel != null) {
      this.UserService.addQuestionToUser(User, this.QuestionSelectModel!!)
    } else {
      this.notSelectedQuestion = true
    }
  }

  removeQuestionToUser(User: User, Question: Question) {
    this.UserService.removeQuestionToUser(User, Question)
  }*/

  save(User: User) {
    const id = this._route.snapshot.params["id"]

    /*if (this.ScoreSelectModel !== null) {
      User.scores = this.ScoreSelectModel
    }*/

    if (id == "new") {
      this.UserService.create(User).subscribe(() => {
        this.router.navigate(["Users"])
      })
    } else {
      this.UserService.update(id, User).subscribe(() => {
        this.router.navigate(["Users"])
      })
    }
  }

  // because the format of the date doesn't fit date picker

}
