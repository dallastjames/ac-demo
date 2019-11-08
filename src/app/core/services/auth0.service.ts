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
        const targetPlatform = platform.is('capacitor') ? 'capacitor' : 'web';
        const config: IonicAuthOptions = {
            authConfig: 'auth0',
            platform: targetPlatform,
            clientID: 'VQU81DmKm1WxhA6iehCrltCzErXo3YYo',
            discoveryUrl: `https://acdemo.auth0.com/.well-known/openid-configuration`,
            redirectUri: `${host}login`,
            scope: 'openid offline_access email picture profile',
            logoutUrl: `${host}logout`,
            iosWebView: 'private'
        };
        super(config);
    }
}
