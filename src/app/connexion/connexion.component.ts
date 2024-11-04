import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
    selector: 'app-connexion', // ou app-auth si tu l'appelles autrement
    templateUrl: './connexion.component.html', // Chemin vers le bon fichier HTML
    styleUrls: ['./connexion.component.scss'] // Si tu as un fichier de styles
})
export class ConnexionComponent implements OnInit {
    isLoginActive: boolean = true; // Variable pour gérer l'état actif des onglets

    constructor(private userService: UserService, private router: Router) {}

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
        const mail = emailInput.value;
        console.log(`Tentative de connexion avec l'email : ${mail}`);
        alert(`Tentative de connexion avec ${mail}`);

        this.userService.findByEmail(mail).subscribe(
            response => {
                console.log('Connexion réussie', response);
                alert('Connexion réussie !');
                this.router.navigate(['/']); // Redirection vers la page principale
            },
            error => {
                console.error('Erreur lors de la connexion', error);
                alert('Une erreur est survenue lors de la connexion.');
            }
        );
    }

    // Méthode pour gérer la soumission du formulaire d'inscription
    onRegisterSubmit(
        firstnameInput: HTMLInputElement,
        lastnameInput: HTMLInputElement,
        emailInput: HTMLInputElement,
        usernameInput: HTMLInputElement
    ): void {
        const id = 0;
        const firstName = firstnameInput.value;
        const lastName = lastnameInput.value;
        const mail = emailInput.value;
        const pseudo = usernameInput.value;


        const userData = {
            id,
            firstName,
            lastName,
            mail,
            pseudo,
            isAdmin: false,
            image: "",
            scores: []
        };
        console.log(`Tentative d'inscription avec le nom : ${firstName} ${lastName}, l'email : ${mail}, et le pseudo : ${pseudo} `);
        alert(`Tentative d'inscription pour ${pseudo}`);

        this.userService.create(userData).subscribe(
            response => {
                console.log('Inscription réussie', response);
                alert('Inscription réussie !');
                this.router.navigate(['/']); // Redirection vers la page principale
            },
            error => {
                console.error('Erreur lors de l\'inscription', error);
                alert('Une erreur est survenue lors de l\'inscription.');
            }
        );
    }
}
