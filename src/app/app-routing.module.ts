import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component"
import { UsersComponent } from "users/users.component"
import { UsersResolver } from "users/users.resolver"
import { UserDetailsComponent } from "users/user-details/user-details.component"
import { UserDetailsResolver } from "users/user-details/user-details.resolver"
import {QuizzesComponent} from "./Quizzes/quizzes.component";
import { ConnexionComponent } from "./connexion/connexion.component";
import { ThemesComponent } from './themes/themes.component';
import {QuizComponent} from "./Quiz/quiz.component";
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: "", component: HomeComponent },
  { path: 'quizzes/:themeId', component: QuizzesComponent },
  { path: '', redirectTo: '/themes', pathMatch: 'full' },
  {path: 'connexion', component: ConnexionComponent},
  {path: 'themes', component: ThemesComponent},
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
