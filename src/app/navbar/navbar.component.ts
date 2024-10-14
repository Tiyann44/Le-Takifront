import { Component } from '@angular/core';
import { Link } from "models/links.model";
import { Router } from "@angular/router";
import { ModalService } from 'services/modal.service';

@Component({
  selector: "epf-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  links: Link[] = [];

  constructor(private router: Router, private modalService: ModalService) {}

  openModal() {
    const modal = document.getElementById("authModal");
    console.log("Modal ouvert"); // Pour vérifier si la méthode est appelée
    if (modal) {
      modal.style.display = "block"; // Affiche le modal
    }

    // Ouvre l'onglet de connexion
    this.modalService.openTab(new MouseEvent('click'), 'Login'); // Appelle openTab du service
  }

}

