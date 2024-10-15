import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-connexion', // ou app-auth si tu l'appelles autrement
    templateUrl: './connexion.component.html', // Chemin vers le bon fichier HTML
    styleUrls: ['./connexion.component.scss'] // Si tu as un fichier de styles
})
export class connexionComponent implements OnInit {
    isLoginActive: boolean = true; // Variable pour gérer l'état actif des onglets

    constructor() {}

    ngOnInit(): void {}

    // Méthode pour afficher l'onglet de connexion
    onLoginTabClick(): void {
        this.isLoginActive = true;
    }

    // Méthode pour afficher l'onglet d'inscription
    onRegisterTabClick(): void {
        this.isLoginActive = false;
    }

    // Méthode pour gérer la soumission du formulaire de connexion
    onLoginSubmit(emailInput: HTMLInputElement): void {
        const email = emailInput.value;
        console.log(`Tentative de connexion avec l'email : ${email}`);
        alert(`Tentative de connexion avec ${email}`);
    }

    // Méthode pour gérer la soumission du formulaire d'inscription
    onRegisterSubmit(
        firstnameInput: HTMLInputElement,
        lastnameInput: HTMLInputElement,
        emailInput: HTMLInputElement,
        usernameInput: HTMLInputElement
    ): void {
        const firstname = firstnameInput.value;
        const lastname = lastnameInput.value;
        const email = emailInput.value;
        const username = usernameInput.value;
        console.log(`Tentative d'inscription avec le nom : ${firstname} ${lastname}, l'email : ${email}, et le pseudo : ${username} `);
        alert(`Tentative d'inscription pour ${username}`);
    }
}
