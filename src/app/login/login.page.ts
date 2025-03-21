import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@/services/auth.service';
import { AlertService } from '@/services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: false,
})
export class LoginPage implements OnInit {
    loginForm: FormGroup;
    isLoading = false;
    showPassword = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private alertService: AlertService
    ) {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            remember: [false],
        });
    }

    ngOnInit() {
        // Load saved credentials if any
        const savedCredentials = this.authService.getRememberedCredentials();
        if (savedCredentials.remember) {
            this.loginForm.patchValue({
                username: savedCredentials.username,
                password: savedCredentials.password,
                remember: true,
            });
        }
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }

        const { username, password, remember } = this.loginForm.value;
        this.isLoading = true;

        this.authService.login(username, password).subscribe(
            (response) => {
                this.isLoading = false;
                if (response.resultat === 'OK') {
                    this.authService.saveCredentials(
                        username,
                        password,
                        remember
                    );
                    // Changer la redirection vers /tabs/articles
                    if (!localStorage.getItem('tutorialSeen') && false) {
                        this.router.navigateByUrl('/tuto');
                    } else {
                        this.router.navigateByUrl('/tabs/articles');
                    }
                } else if (response.erreur) {
                    this.alertService.showToast(response.erreur);
                }
            },
            (error) => {
                this.isLoading = false;
                this.alertService.showAlert(
                    'Erreur',
                    'Une erreur est survenue lors de la connexion.'
                );
                console.error(error);
            }
        );
    }
}
