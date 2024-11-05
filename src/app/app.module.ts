import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "app-routing.module"
import { AppComponent } from "app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NavbarComponent } from "navbar/navbar.component"
import { MatListModule } from "@angular/material/list"
import { HomeComponent } from "home/home.component"
import {UsersComponent} from "users/users.component"
import {UserDetailsComponent} from "users/user-details/user-details.component"
import { FormsModule } from "@angular/forms"
import { MatIconModule } from "@angular/material/icon"
import { MatButtonModule } from "@angular/material/button"
import { HttpClientModule } from "@angular/common/http"
import {QuizzesComponent} from "./Quizzes/quizzes.component";
import { ConnexionComponent } from "./connexion/connexion.component";
import { ThemesComponent } from './themes/themes.component';
import { ScoreComponent } from "./Score/score.component";
import {QuizComponent} from "./Quiz/quiz.component";
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ThemeModalComponent } from './modals/add-theme-modal/theme-modal.component';
import { QuizModalComponent } from './modals/add-quiz-modal/quiz-modal.component';
import { QuestionModalComponent } from './modals/add-question-modal/question-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsersComponent,
    UserDetailsComponent,
    QuizzesComponent,
    ConnexionComponent,
    ThemesComponent,
    ScoreComponent,
    QuizComponent,
    AdminPanelComponent,
    ThemeModalComponent,
    QuestionModalComponent,
    QuizModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
