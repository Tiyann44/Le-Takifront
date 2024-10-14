import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router"
import { Observable } from "rxjs"
import { MajorService } from "services/theme.service"
import { Major } from "models/score.model"

@Injectable({
  providedIn: "root",
})
export class MajorsResolver implements Resolve<Major[]> {
  constructor(private majorService: MajorService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Major[]> {
    return this.majorService.findAll()
  }
}
