import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { HomeComponent } from "home/home.component"
import { UsersComponent } from "users/users.component"
import { UsersResolver } from "users/users.resolver"
import { UserDetailsComponent } from "users/user-details/user-details.component"
import { UserDetailsResolver } from "users/user-details/user-details.resolver"
import {QuizzComponent} from "./Quizz/quizz.component";
import { ConnexionComponent } from "./connexion/connexion.component";
import { ThemesComponent } from './themes/themes.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: 'quiz', component: QuizzComponent },
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
