import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IdentityService {
    private tokenKey: string = 'acAuthToken';
    private token: string;
    // private user: User;
}
