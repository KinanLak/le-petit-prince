import { Component } from '@angular/core';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.page.html',
    styleUrls: ['./contact.page.scss'],
    standalone: false,
})
export class ContactPage {
    contactInfo = {
        address: "123 Rue de l'École",
        phone: '01 23 45 67 89',
        email: 'contact@lepetitprince.fr',
        hours: 'Lundi - Vendredi: 8h30 - 16h30',
    };

    constructor() {}
}
