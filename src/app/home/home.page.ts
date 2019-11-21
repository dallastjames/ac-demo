import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IdentityService, Auth0Service } from '@ac/core/services';
import { User } from '@ac/core/models';
import { Router } from '@angular/router';

@Component({
    selector: 'ac-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage {
    public currentUser$: Observable<User> = this.identityService.get();

    constructor(
        private identityService: IdentityService,
        private auth0Service: Auth0Service,
        private router: Router
    ) {}

    public async logout(): Promise<void> {
        await this.identityService.remove();
        this.auth0Service.logout();
        this.router.navigateByUrl('/login');
    }
}
