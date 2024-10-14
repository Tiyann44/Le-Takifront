import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private modal: HTMLElement | null = null;

    constructor() {}

    setModal(modal: HTMLElement) {
        this.modal = modal;
    }

    openModal() {
        if (this.modal) {
            console.log("Ouverture du modal"); // Ajoute ce log
            this.modal.style.display = 'block'; // Affiche le modal
        }
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none'; // Cache le modal
        }
    }
}
