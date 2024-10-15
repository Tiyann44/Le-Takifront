import { Injectable } from "@angular/core"
import { Resolve } from "@angular/router"
import { Observable } from "rxjs"
import { User } from "models/user.model"
import { UserService } from "services/user.service"

@Injectable({
  providedIn: "root",
})
export class UsersResolver implements Resolve<User[]> {
  constructor(private userService: UserService) {
  }

  resolve(): Observable<User[]> {
    return this.userService.findAll()
  }
}
