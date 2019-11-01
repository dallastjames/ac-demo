import { Injectable } from '@angular/core';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class Auth0Service extends IonicAuth {
    constructor(platform: Platform) {
        const host = platform.is('capacitor')
            ? 'com.dallastjames.acdemo://'
            : 'http://localhost:8100/';
        const auth0Config: IonicAuthOptions = {
            // tokenStorageProvider: 'localStorage',
            authConfig: 'auth0',
            platform: platform.is('capacitor') ? 'capacitor' : 'web',
            clientID: 'N9t6vp7jI38GqIBbq72emgbuqLnF2JL5',
            discoveryUrl:
                'https://acdemo.auth0.com/.well-known/openid-configuration',
            redirectUri: `${host}login`,
            scope: 'openid offline_access email picture profile',
            audience: '',
            logoutUrl: `${host}login`,
            iosWebView: 'private'
        };
        console.log('auth0config', auth0Config);
        super(auth0Config);
    }
}
