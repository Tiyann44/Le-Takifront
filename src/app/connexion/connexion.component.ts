import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

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

        this.userService.findByEmail(email).subscribe(
            response => {
                if (response) {
                    this.authService.login(response);

                    if (this.authService.isAdmin()) {
                        alert('Bienvenue, administrateur !');
                        this.router.navigate(['/admin']);
                    } else {
                        this.router.navigate(['/']);
                    }
                } else {
                    alert("Utilisateur non trouvé ou email invalide.");
                }
            },
            error => {
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

        if (!emailRegex.test(mail)) {
            alert('L\'email que vous avez entré n\'est pas valide.');
            return;
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

        this.userService.create(userData).subscribe(
            response => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/connexion']);
                });
            },
            error => {
                alert('Une erreur est survenue lors de l\'inscription.');
            }
        );
    }
}
