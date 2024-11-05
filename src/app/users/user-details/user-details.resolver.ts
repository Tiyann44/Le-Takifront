import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"
import { UserService } from "services/user.service"
import { User } from "models/user.model"
import { Score } from "models/score.model"

@Injectable({
  providedIn: "root",
})
export class UserDetailsResolver implements Resolve<User> {
  constructor(private UserService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    if (route.params["id"] == "new") {
      return new Observable((observer) => observer.next({
        firstName: "",
        email: "",
        id: 0,
        isAdmin: false,
        scores: [],
        lastName: "", }))
    }
    return this.UserService.findById(parseInt(route.params["id"], 10))
  }
}
