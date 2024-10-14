import { Component } from '@angular/core';

@Component({
    selector: 'app-connexion',
    templateUrl: './connexion.component.html',
    styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {

    constructor() {}

    // Ferme le modal
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

        const tablinks = document.getElementsByClassName("tablinks") as HTMLCollectionOf<HTMLElement>;
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].classList.remove("active"); // Supprime la classe active de tous les onglets
        }

        const activeTab = document.getElementById(tabName);
        if (activeTab) {
            activeTab.style.display = "block"; // Affiche l'onglet actif
        }

        // Vérifie si evt est bien un événement d'un élément HTML
        const currentTarget = (evt.target as HTMLElement);
        if (currentTarget) {
            currentTarget.classList.add("active"); // Ajoute la classe active au bouton cliqué
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
