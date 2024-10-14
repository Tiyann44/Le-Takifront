import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ModalService } from 'services/modal.service';

@Component({
    selector: 'app-connexion',
    templateUrl: './connexion.component.html',
    styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
    @ViewChild('authModal') authModal!: ElementRef;
    constructor(private modalService: ModalService) {}

    ngOnInit() {
        const defaultOpen = document.getElementById("defaultOpen");
        if (defaultOpen) {
            defaultOpen.click();
        }

        this.modalService.setModal(this.authModal.nativeElement);
        console.log("Modal configuré :", this.authModal.nativeElement);
    }

    closeModal() {
        const modal = document.getElementById("authModal");
        if (modal) {
            modal.style.display = "none"; // Cache le modal
        }
    }

    openTab(evt: Event, tabName: string) {
        console.log(`Onglet ouvert: ${tabName}`);
        const tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none"; // Cache tous les onglets
        }

        const activeTab = document.getElementById(tabName);
        if (activeTab) {
            activeTab.style.display = "block"; // Affiche l'onglet actif
        }

        // Ajoute la classe active au bouton cliqué
        const currentTarget = evt.currentTarget as HTMLElement;
        if (currentTarget) {
            currentTarget.classList.add("active"); // Ajoute la classe active au bouton
        }
    }

    onLoginSubmit() {
        console.log("Login submitted");
        this.closeModal();
    }

    onRegisterSubmit() {
        console.log("Registration submitted");
        this.closeModal();
    }
}
