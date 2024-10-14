import {AfterViewInit, Component, OnInit} from "@angular/core"
import { Link } from "models/links.model"
import {Router} from "@angular/router";

@Component({
  selector: "epf-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {

  links: Link[] = []

  constructor(private router: Router) { }

  openConnexion() {
    // Redirige vers la page de connexion
    this.router.navigate(['/connexion']);
  }
  /*constructor() {
    this.links.push({ name: "Students", href: "students" })
    this.links.push({ name: "Majors", href: "majors" })
  }*/
}
