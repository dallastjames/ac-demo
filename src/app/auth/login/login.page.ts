import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@ac/core/services';

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

    constructor(private fb: FormBuilder, private _authService: AuthService) {}

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
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
        this._authService
            .login(value.username, value.password)
            .subscribe(success => {
                console.log(success);
            });
    }
}
