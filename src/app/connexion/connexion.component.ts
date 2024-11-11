import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import {of} from "rxjs";

@Component({
    selector: 'app-connexion',
    templateUrl: './connexion.component.html',
    styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
    isLoginActive: boolean = true;

    constructor(private userService: UserService, private router: Router, private authService: AuthService) {}

    ngOnInit(): void {}

    onLoginTabClick(): void {
        this.isLoginActive = true;
    }

    onRegisterTabClick(): void {
        this.isLoginActive = false;
    }


    onLoginSubmit(emailInput: HTMLInputElement): void {
        const email = emailInput.value;
        console.log(`Tentative de connexion avec l'email : ${email}`);
        alert(`Tentative de connexion avec ${email}`);

        this.userService.findByEmail(email).subscribe(
            response => {
                if (response) {
                    console.log('Connexion réussie', response);
                    alert('Connexion réussie !');

                    // Appel de la méthode login avec l'utilisateur connecté
                    this.authService.login(response);

                    // Vérifie si l'utilisateur est admin et affiche un message ou effectue une action spécifique
                    if (this.authService.isAdmin()) {
                        console.log('Utilisateur administrateur');
                        alert('Bienvenue, administrateur !');
                        // Par exemple, redirection vers une page d'admin :
                        this.router.navigate(['/admin']);
                    } else {
                        this.router.navigate(['/']); // Redirection vers la page principale pour un utilisateur non-admin
                    }
                } else {
                    alert("Utilisateur non trouvé ou email invalide.");
                }
            },
            error => {
                console.error('Erreur lors de la connexion', error);
                alert('Une erreur est survenue lors de la connexion.');
            }
        );
    }

    onRegisterSubmit(
        firstnameInput: HTMLInputElement,
        lastnameInput: HTMLInputElement,
        emailInput: HTMLInputElement,
        usernameInput: HTMLInputElement
    ): void {
        const firstName = firstnameInput.value;
        const lastName = lastnameInput.value;
        const mail = emailInput.value;
        const pseudo = usernameInput.value;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!firstName || !lastName || !mail || !pseudo) {
            alert("Veuillez compléter tous les champs.");
            return;
        }

        // Vérification de la validité de l'email
        if (!emailRegex.test(mail)) {
            // Afficher une alerte si l'email est invalide
            alert('L\'email que vous avez entré n\'est pas valide.');
            return; // Retourne un observable vide ou null
        }

        const userData: User = {
            id: 0,
            firstName,
            lastName,
            mail,
            pseudo,
            isAdmin: false,
            image: '',
            scores: []
        };

        console.log(`Tentative d'inscription avec : ${firstName} ${lastName}, email : ${mail}, pseudo : ${pseudo}`);
        alert(`Tentative d'inscription pour ${pseudo}`);

        this.userService.create(userData).subscribe(
            response => {
                console.log('Inscription réussie', response);
                alert('Inscription réussie !');
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/connexion']);
                });
            },
            error => {
                console.error('Erreur lors de l\'inscription', error);
                alert('Une erreur est survenue lors de l\'inscription.');
            }
        );
    }
}
