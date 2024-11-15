import { Component } from "@angular/core"
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
  allScores$: Observable<Score[]> | undefined
  allQuestions$: Observable<Question[]> | undefined

  constructor(
    private _route: ActivatedRoute,
    private QuestionService: QuestionService,
    private UserService: UserService,
    private ScoreService: ScoreService,
    private router: Router,
  ) {
    this.allScores$ = this.ScoreService.findAll()
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

}
