import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable, BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { User } from './../models/user'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = `${environment.baseUrl}/api/auth`
    private readonly API_USERS_URL = `${environment.baseUrl}/api/users`

    private currentUserSubject: BehaviorSubject<User>
    public currentUser: Observable<User>

    constructor(private _http: HttpClient) {
        const currentUserLS = JSON.parse(localStorage.getItem('currentUser'))
        this.currentUserSubject = new BehaviorSubject<User>(currentUserLS)
        this.currentUser = this.currentUserSubject.asObservable()
    }

    public get currentUserVal(): User {
        return this.currentUserSubject.value
    }

    public login(username: string, password: string) {
        const payload = {username, password}
        const apiUrl = `${this.API_URL}/login`

        return this._http.post<any>(apiUrl, payload)
                .pipe(map(user => {
                    if (user && user.token) {
                        localStorage.setItem('currentUserToken', user.token)
                        this.currentUserSubject.next(user)
                    }

                    return user
                }))
    }

    public logout() {
        localStorage.removeItem('currentUserToken')
        this.currentUserSubject.next(null)
    }

    public register(user: User) {
        const apiUrl = `${this.API_USERS_URL}/register`
        return this._http.post<any>(apiUrl, user)
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('currentUserToken')

        return !!token
    }
}