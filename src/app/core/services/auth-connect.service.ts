import { Injectable } from '@angular/core';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';

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
            logoutUrl: 'com.dallastjames.acdemo://login',
            iosWebView: 'private'
        };
        super(auth0Config);
    }
}
