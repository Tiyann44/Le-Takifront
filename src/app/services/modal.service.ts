import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    openTab(evt: Event, tabName: string) {
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

        const currentTarget = (evt.target as HTMLElement);
        if (currentTarget) {
            currentTarget.classList.add("active"); // Ajoute la classe active au bouton cliqué
        }
    }
}
