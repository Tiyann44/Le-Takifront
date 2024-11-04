import { Injectable } from '@angular/core';
import { User } from 'models/user.model'; // Assurez-vous que le chemin est correct
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    login(user: User): void {
        this.currentUserSubject.next(user);
    }

    logout(): void {
        this.currentUserSubject.next(null);
    }

    isLoggedIn(): boolean {
        return this.currentUserSubject.value !== null;
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }
}
