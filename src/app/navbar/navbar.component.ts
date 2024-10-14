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

  constructor(private modalService: ModalService) {}

  openModal() {
    console.log("Modal ouvert"); // Pour vérifier si la méthode est appelée
    this.modalService.openModal(); // Appelle la méthode pour ouvrir le modal dans le service
  }


}

