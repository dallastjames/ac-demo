import { Injectable } from '@angular/core';
import { IonicAuth, IonicAuthOptions } from '@ionic-enterprise/auth';
import { Platform } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AzureService extends IonicAuth {
    constructor(platform: Platform) {
        const host = platform.is('capacitor')
            ? 'com.dallastjames.acdemo://'
            : 'http://localhost:8100/';
        const azureConfig: IonicAuthOptions = {
            // tokenStorageProvider: 'localStorage',
            authConfig: 'azure',
            platform: platform.is('capacitor') ? 'capacitor' : 'web',
            clientID: '0419356f-ef13-4954-9bd0-c09431a66d4d',
            discoveryUrl:
                'https://dtjacdemo.b2clogin.com/dtjacdemo.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_acdemo2',
            redirectUri: `${host}login`,
            // SCOPES INFO: https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-tutorials-spa-webapi?tabs=applications#configure-scopes
            scope:
                'https://dtjacdemo.onmicrosoft.com/acdemo/demo.read openid offline_access email',
            audience: '',
            logoutUrl: `${host}login?logout=true`,
            iosWebView: 'private'
        };
        console.log('azureConfig', azureConfig);
        super(azureConfig);
    }
}
