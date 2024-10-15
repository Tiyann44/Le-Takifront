import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component"
import { UsersComponent } from "students/students.component"
import { UsersResolver } from "students/students.resolver"
import { UserDetailsComponent } from "students/student-details/student-details.component"
import { UserDetailsResolver } from "students/student-details/student-details.resolver"
import {QuizzComponent} from "./Quizz/quizz.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'quiz', component: QuizzComponent },
  {
    path: "students",
    component: UsersComponent,
    resolve: {
      students: UsersResolver,
    },
  },
  {
    path: "student-details/:id",
    component: UserDetailsComponent,
    resolve: {
      student: UserDetailsResolver,
    },
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
