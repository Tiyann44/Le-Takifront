import { Component, OnInit } from '@angular/core';
import { AuthService } from 'services/auth.service';
import { UserService } from 'services/user.service';
import { User } from 'models/user.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user: User = {
        id:0,
        firstName: '',
        lastName: '',
        pseudo: '',
        mail: '',
        image: '/assets/defaultPicture.svg',
        isAdmin:false,
        scores:[]
    };
    updatedUser: User = { ...this.user };
    avatarFile: File | null = null;
    notificationVisible: boolean = false;

    constructor(private authService: AuthService, private userService: UserService) {}

    ngOnInit(): void {
        const currentUser = this.authService.getCurrentUser();

        if (currentUser) {
            this.userService.findById(currentUser.id).subscribe(
                (user) => {
                    this.user = user;
                    this.updatedUser = { ...user };
                },
                (error) => {
                    console.error('Erreur lors du chargement des informations utilisateur', error);
                }
            );
        }
    }

    onAvatarClick(): void {
        document.getElementById('avatar-upload')?.click();
    }

    onAvatarChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.avatarFile = input.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.updatedUser.image = e.target.result;
            };
            reader.readAsDataURL(this.avatarFile);
        }
    }

    onSubmit(event: Event): void {
        event.preventDefault();

        if (this.updatedUser && this.user) {
            this.userService.update(this.user.id, this.updatedUser).subscribe(
                (updatedUser) => {
                    console.log('Informations mises à jour avec succès', updatedUser);
                    this.user = updatedUser;
                    this.updatedUser = { ...updatedUser };

                    this.showNotification();
                },
                (error) => {
                    console.error('Erreur lors de la mise à jour des informations', error);
                }
            );
        }
    }

    showNotification(): void {
        this.notificationVisible = true;
        setTimeout(() => {
            this.notificationVisible = false;
        }, 3000);
    }
}
