import { Component, OnInit } from "@angular/core"
import { Link } from "models/link.model"
import { Router, ActivatedRoute } from "@angular/router";
import { ModalService } from 'services/modal.service';


@Component({
  selector: "epf-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  currentRoute: string = "";
  links: Link[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  isHomePage(): boolean {
    return this.currentRoute === '/';
  }

  isLoginPage(): boolean {
    return this.currentRoute === '/login'; // ou autre chemin pour la connexion
  }

}

