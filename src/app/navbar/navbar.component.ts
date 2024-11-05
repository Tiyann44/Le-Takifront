import { Component, OnInit } from "@angular/core"
import { Link } from "models/link.model"
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "services/auth.service";

@Component({
  selector: "epf-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  currentRoute: string = "";
  links: Link[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  isHomePage(): boolean {
    return this.currentRoute === '/';
  }

  isLoginPage(): boolean {
    return this.currentRoute === '/connexion'; // ou autre chemin pour la connexion
  }

  isThemePage(): boolean {
    return this.currentRoute === '/themes'; // ou autre chemin pour les thèmes
  }

  isQuizzesPage(): boolean {
    return this.currentRoute.startsWith('/quizzes/');
  }

    isQuizPage(): boolean {
        return this.currentRoute.startsWith('/quiz/');
    }

  isScorePage(): boolean {
    return this.currentRoute === '/score';
  }
  isAdminPage(): boolean {
    return this.currentRoute === '/admin';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onLogout(): void {
    this.authService.logout(); // Gère la déconnexion de l'utilisateur
    this.router.navigate(['/connexion']); // Redirection vers la page de connexion
  }

}

