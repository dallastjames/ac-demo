import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, Auth0Service, IdentityService } from '@ac/core/services';
import { Router } from '@angular/router';

interface LoginFormData {
    username: string;
    password: string;
}

@Component({
    selector: 'ac-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;
    public authenticated: string = 'no-auth';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private auth0Service: Auth0Service,
        private identityService: IdentityService
    ) {}

    async ngOnInit(): Promise<void> {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    async ionViewWillEnter(): Promise<void> {
        await this.checkStatus();
        // if (this.authenticated === 'has-auth') {
        //     this.router.navigateByUrl('/home');
        // }
    }

    public tryLogin({
        valid,
        value
    }: {
        valid: boolean;
        value: LoginFormData;
    }): void {
        if (!valid) {
            return;
        }
        this.authService
            .login(value.username, value.password)
            .subscribe(success => {
                this.router.navigateByUrl('/home');
            });
    }

    public async tryAuth0(): Promise<void> {
        await this.auth0Service.login();
        this.checkStatus();
        if (this.authenticated) {
            const token = await this.auth0Service.getIdToken();
            this.identityService.set(
                {
                    username: token.nickname
                },
                await this.auth0Service.getAccessToken()
            );
            this.router.navigateByUrl('/home');
        } else {
            this.authenticated = 'auth-error';
        }
    }

    public async logout(): Promise<void> {
        await this.auth0Service.logout();
        this.checkStatus();
    }

    public async checkStatus(): Promise<void> {
        this.authenticated = (await this.auth0Service.isAuthenticated())
            ? 'has-auth'
            : 'no-auth';
    }
}
