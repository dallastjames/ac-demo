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
        console.log('hash', window.location.hash);
        if (window.location.hash) {
            console.log('href', window.location.href);
            const res = await this.auth0Service.handleCallback(
                window.location.href
            );
            console.log('res', res);
            const token = await this.auth0Service.getIdToken();
            console.log('token', token);
            this.identityService.set(
                {
                    username: token.nickname
                },
                await this.auth0Service.getAccessToken()
            );
            console.log('before navigate');
            this.router.navigateByUrl('/home');
        }
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
    }
}
