import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { IdentityService, Auth0Service } from '@ac/core/services';
import { Observable, of, from } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(
        private identityService: IdentityService,
        private auth0Service: Auth0Service,
        private router: Router
    ) {}

    public canActivate(): Observable<boolean> {
        return this.identityService.get().pipe(
            map(u => !!u),
            switchMap(loggedIn => {
                if (!loggedIn) {
                    return from(this.auth0Service.isAuthenticated()).pipe(
                        switchMap(isLoggedInSSO => {
                            if (!isLoggedInSSO) {
                                return of(false);
                            } else {
                                // this.identityService.new
                            }
                        })
                    );
                } else {
                    return of(true);
                }
            }),
            tap(loggedIn => {
                if (!loggedIn) {
                    this.router.navigateByUrl('/login');
                }
            })
        );
    }
}
