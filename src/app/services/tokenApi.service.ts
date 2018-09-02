import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class TokenApiService {
    constructor() {
    }

    jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.accessToken) {
            let headers = new Headers(
                { 'Authorization': currentUser.accessToken },
            );
            return new RequestOptions({ headers: headers });
        }
    }

}