import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        // Vérifier ici la présence d'une authentification (méthode isLoggedIn à adapter selon votre implémentation)
        if (this.authService.getIsLoggedIn()) {
            return true;
        }
        // Rediriger vers login en cas de non-authentification
        this.router.navigate(['/login']);
        return false;
    }
}
