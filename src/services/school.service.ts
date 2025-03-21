import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { SchoolData, ErrorResponse } from '../interfaces/school-data';

@Injectable({
    providedIn: 'root',
})
export class SchoolService {
    private baseUrl = 'https://sebastien-thon.fr/prince/index.php';
    private schoolData = new BehaviorSubject<SchoolData | null>(null);
    private currentCredentials: { login: string; password: string } | null =
        null;

    constructor(private http: HttpClient) {}

    getSchoolData(login: string, password: string): Observable<boolean> {
        this.currentCredentials = { login, password };
        return this.http
            .get<SchoolData | ErrorResponse>(
                `${this.baseUrl}?login=${login}&mdp=${password}`
            )
            .pipe(
                map((response) => {
                    console.log('Réponse API reçue :', response);
                    if ('erreur' in response) {
                        console.error('Erreur API :', response.erreur);
                        return false;
                    }

                    const data: SchoolData = {
                        articles: response.articles || [],
                        galeries: response.galeries || [],
                        dates: response.dates || [],
                    };
                    console.log('Mise à jour de schoolData avec :', data);
                    this.schoolData.next(data);
                    return true;
                }),
                catchError((err) => {
                    console.error('Erreur HTTP :', err);
                    return of(false);
                })
            );
    }

    getData(): Observable<SchoolData | null> {
        // Rafraîchir les données si on a des credentials
        if (this.currentCredentials && !this.schoolData.value) {
            this.getSchoolData(
                this.currentCredentials.login,
                this.currentCredentials.password
            ).subscribe();
        }
        return this.schoolData.asObservable();
    }

    refresh(): Observable<boolean> {
        if (!this.currentCredentials) return of(false);
        return this.getSchoolData(
            this.currentCredentials.login,
            this.currentCredentials.password
        );
    }
}
