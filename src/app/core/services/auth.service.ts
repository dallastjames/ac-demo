import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@ac/env';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    public login(username: string, password: string): Observable<string> {
        return this.http.post<any>(`${environment.dataService}`, {
            username,
            password
        });
    }
}
