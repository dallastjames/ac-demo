import { Injectable } from '@angular/core';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class Auth0Service extends IonicAuth {
    constructor(platform: Platform) {
        const host = platform.is('capacitor')
            ? 'comdallastjamesacdemo://'
            : 'http://localhost:8100/';
        const targetPlatform = platform.is('capacitor') ? 'capacitor' : 'web';
        const config: IonicAuthOptions = {
            authConfig: 'auth0',
            platform: targetPlatform,
            clientID: 'kG7kR8XChvRLANnuQO8h9hjHurKgW7au',
            discoveryUrl: `https://dev-j3wl8n0b.auth0.com/.well-known/openid-configuration`,
            redirectUri: `${host}login`,
            scope: 'openid offline_access email picture profile',
            logoutUrl: `${host}logout`,
            iosWebView: 'shared'
        };
        super(config);
    }
}
