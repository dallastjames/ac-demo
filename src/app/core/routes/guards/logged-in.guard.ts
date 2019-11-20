import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { IdentityService, Auth0Service } from '@ac/core/services';
import { Observable, from, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(
        private identityService: IdentityService,
        private router: Router,
        private auth0Service: Auth0Service
    ) {}

    public async canActivate(): Promise<boolean> {
        // const identity = await this.identityService.get().toPromise();
        // console.log('identity', identity);
        // if (!!identity) {
        //     return true;
        // }
        // console.log('before hasAuth');
        // const hasAuth = await this.auth0Service.isAuthenticated();
        // console.log('hasAuth', hasAuth);
        // if (!hasAuth) {
        //     this.router.navigateByUrl('/login');
        //     return false;
        // }
        // const tokenData = await this.auth0Service.getIdToken();
        // this.identityService.set(
        //     {
        //         username: tokenData.nickname
        //     },
        //     await this.auth0Service.getAccessToken()
        // );
        return true;
    }
}
