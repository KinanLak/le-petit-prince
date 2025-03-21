import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { SchoolService } from './school.service';

export interface LoginResponse {
    resultat?: string;
    erreur?: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private baseUrl = 'https://sebastien-thon.fr/prince/index.php';
    private isLoggedIn = false;

    constructor(
        private http: HttpClient,
        private schoolService: SchoolService
    ) {}

    login(username: string, password: string): Observable<LoginResponse> {
        const url = `${this.baseUrl}?connexion&login=${username}&mdp=${password}`;
        return this.http.get<LoginResponse>(url).pipe(
            tap((response) => {
                console.log('Réponse de login :', response);
                if (response.resultat === 'OK') {
                    this.isLoggedIn = true;
                    console.log('Connexion OK, appel de getSchoolData...');
                    // Appeler getSchoolData et s'abonner pour déclencher la requête
                    this.schoolService
                        .getSchoolData(username, password)
                        .subscribe(
                            (success) =>
                                console.log(
                                    'getSchoolData terminé avec succès :',
                                    success
                                ),
                            (error) =>
                                console.error(
                                    'Erreur dans getSchoolData :',
                                    error
                                )
                        );
                }
            })
        );
    }

    getIsLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    saveCredentials(
        username: string,
        password: string,
        remember: boolean
    ): void {
        if (remember) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            localStorage.setItem('remember', 'true');
        } else {
            this.clearCredentials();
        }
    }

    getRememberedCredentials(): {
        username: string;
        password: string;
        remember: boolean;
    } {
        return {
            username: localStorage.getItem('username') || '',
            password: localStorage.getItem('password') || '',
            remember: localStorage.getItem('remember') === 'true',
        };
    }

    clearCredentials(): void {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('remember');
    }
}
