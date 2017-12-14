import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable'

import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {
    backendUrl = environment.backendUrl;
  
    isCurrentUserSubject:BehaviorSubject<string> = new BehaviorSubject<string>(this.getcurrentuser1());

    isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());


    constructor(private _httpclient: HttpClient) {}

    private hasToken() : boolean {
        return !!localStorage.getItem('token');
      }

      private getcurrentuser1() : string {
        return localStorage.getItem('token');
      }

      isLoggedIn() : Observable<boolean> {
        return this.isLoginSubject.asObservable();
      }

      getCurrentUser() : Observable<string> {
          return this.isCurrentUserSubject.asObservable();
      }

    emailsignup(emailsignup: any) {
        return this._httpclient.post(this.backendUrl + '/api/emailsignup/', emailsignup);
     
    }

    
    emailsignin(emailsignin: any) {
        return this._httpclient.post(this.backendUrl + '/api/emailsignin/', emailsignin);
       
    }

    socialsignup(socialsignup: any) {
        
         console.log(JSON.stringify(socialsignup));
        return this._httpclient.post(this.backendUrl + '/api/socialsignup/', socialsignup);
      
    }

    gpsignup(gpsignup: any) {
        return this._httpclient.post(this.backendUrl + '/api/gpsignup/', gpsignup);
    }

    emailsignin1(username: string, password: string) {
        let url = this.backendUrl + "/index";
        let params = 'username='+username+'&password='+password;
        let httpheaders = new HttpHeaders(
            {
            'Content-Type': 'application/x-www-form-urlencoded'
            });

        return this._httpclient.post(url, params, {headers: httpheaders, withCredentials : true});
    
    }    


    recoverauth(recoverauth:string) {
        return this._httpclient.post(this.backendUrl + '/api/recoverpass/', recoverauth);
    }


    logout() {
        let url = this.backendUrl + "/logout";
        return this._httpclient.get(url, {withCredentials: true});	
    }

}