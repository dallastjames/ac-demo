import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { environment } from '@ac/env';
import { IdentityService } from './identity.service';

@Injectable({
    providedIn: 'root'
})
export class AuthConnectService extends IonicAuth {
    constructor() {
        const auth0Config: IonicAuthOptions = {
            authConfig: 'auth0',
            platform: 'capacitor',
            clientID: 'N9t6vp7jI38GqIBbq72emgbuqLnF2JL5',
            discoveryUrl:
                'https://acdemo.auth0.com/.well-known/openid-configuration',
            redirectUri: 'com.dallastjames.acdemo://callback',
            scope: 'openid offline_access email picture profile',
            audience: '',
            logoutUrl: '',
            iosWebView: 'private'
        };
        super(auth0Config);
    }
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private identityService: IdentityService
    ) {}

    public login(username: string, password: string): Observable<boolean> {
        // prettier-ignore
        return this.http.post(`${environment.dataService}/auth/login`, {
            username,
            password
        }, {
            responseType: 'text'
        }).pipe(
            map(token => this.identityService.newIdentity(token)),
            mapTo(true)
        );
    }
}
