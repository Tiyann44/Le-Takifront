import { Component } from '@angular/core';

@Component({
    selector: 'app-connexion',
    templateUrl: './connexion.component.html',
    styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
    email: string = '';
    password: string = '';

    onSubmit() {
        // Remplacez cette partie par votre logique d'authentification
       /* console.log('Email:', this.email);
        console.log('Mot de passe:', this.password);*/

        // Exemple de logique d'authentification
        // this.authService.login(this.email, this.password).subscribe(response => {
        //     // Gérer la réponse du serveur
        // }, error => {
        //     // Gérer l'erreur
        // });
    }
}
