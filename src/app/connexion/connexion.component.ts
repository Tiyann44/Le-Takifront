import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-connexion',
    templateUrl: './connexion.component.html',
    styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        // Par défaut, afficher l'onglet de Connexion
        const defaultTab = document.getElementById("defaultOpen");
        if (defaultTab) {
            defaultTab.click();
        }
    }

    openTab(evt: any, tabName: string): void {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");

        // Masquer toutes les tabcontent
        for (i = 0; i < tabcontent.length; i++) {
            (tabcontent[i] as HTMLElement).style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");

        // Supprimer la classe active de tous les boutons
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Afficher le contenu de l'onglet sélectionné
        const selectedTab = document.getElementById(tabName);
        if (selectedTab) {
            selectedTab.style.display = "block";
        }

        // Ajouter la classe active au bouton cliqué
        evt.currentTarget.className += " active";
    }

    closeModal(): void {
        var modal = document.getElementById("authModal");
        if (modal) {
            modal.style.display = "none";
        }
    }

    protected readonly event = event;
}
