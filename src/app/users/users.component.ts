import { Component } from "@angular/core"
import { map, Observable } from "rxjs"
import { User} from "models/user.model"
import { ActivatedRoute, Router } from "@angular/router"
import { UserService } from "services/user.service"

@Component({
  selector: "epf-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent {
  users$: Observable<User[]> = this._route.data.pipe(map((data) => data["users"]))

  constructor(private _route: ActivatedRoute, private userService: UserService, private router: Router,) {
  }

  deleteById(event: any, user: User) {
    event.stopPropagation()
    this.userService.deleteById(user).subscribe(() => this.router.navigate(["users"]))
  }

  deleteByEmail(event: any, user: User) {
    event.stopPropagation()
    this.userService.deleteByEmail(user).subscribe(() => this.router.navigate(["users"]))
  }

  searchByMajorAndCourse($event: Observable<User[]>) {
    this.users$ = $event
  }
}
