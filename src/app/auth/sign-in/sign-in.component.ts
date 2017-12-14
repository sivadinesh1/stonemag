import { Component, OnInit, ViewChild, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router} from '@angular/router';

import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
declare let $: any;
declare var gapi: any;
//declare var auth2: any;
 
declare var window: any;
declare var FB: any;

declare let webGlObject: any; 


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css', '../auth-style.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignInComponent implements OnInit {
  apiresponse: any;
  @ViewChild('f') signinForm: NgForm;
  loggedIn: boolean;
  responsemsg: any;
  public auth2: any;

  res:any;

  loged: boolean = false;
  token: any;
  
  loginform = [
    {
      username: '',
      password: '',
      source:''
    }
  ]

  googleLoginButtonId = "google-login-button";
  userAuthToken = null;
  userDisplayName = "empty";

  constructor(private _authservice: AuthService, private _router: Router,
    private _location: Location, 
   private _cdr: ChangeDetectorRef,
  
    private _zone: NgZone) { 

  }

  ngOnInit() {
    $(function () {
      $('.parallax').parallax();
      var height = $(window).height();

      $('#container').css({ 'height': height + 'px' });


    }); // end of document ready
  }
  
  ngAfterViewInit(){
    console.log('in view after init..');
    this.loadgoogle();
     
  }


  onSubmit() {
    console.log('inside. ts..' + this.signinForm);

      this.loginform[0].username = this.signinForm.value.username;
      this.loginform[0].password = this.signinForm.value.password;
      this.loginform[0].source = 'EM';

      this._authservice.emailsignin(this.loginform).subscribe(
        data => {
          this.apiresponse = data;
  
          if(this.apiresponse.message === 'User not Found') {
            this.responsemsg = "User not Found";
          } else if (this.apiresponse.message === 'Password did not Match') {
            this.responsemsg = "Username & Password Mismatch";
          } else if(this.apiresponse.message === 'success') {
            console.log("Login.. successfuly"+this.apiresponse.additionalInfo);
           
         
            localStorage.setItem('token', this.loginform[0].username);
            this._authservice.isLoginSubject.next(true);
            this._authservice.isCurrentUserSubject.next(this.apiresponse.additionalInfo);
            this._cdr.markForCheck();
            this._router.navigate(['/']);
          }
        } 
      );    
  }

//fb bew

fblogin() {
  FB.login(function(response) {
    if (response.authResponse) {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Good to see you, ' + response.name + '.');
      console.log('xyz...'+ response);
      
      FB.getLoginStatus( (response) => {
        if (response.status === 'connected') {
          console.log('zzzzfb connected. Getting details.');
          localStorage.setItem('token', response.first_name);
          this._authservice.isLoginSubject.next(true);
          this._authservice.isCurrentUserSubject.next(response.first_name);
      
          this._cdr.markForCheck();
          this._router.navigate(['/']);
        } else if (response.status === 'not_authorized') {
          console.log('but has not authenticated your app');
        }


      });

      if (response.status === 'connected') {
        console.log('xyz..123.'+ response.first_name);
        localStorage.setItem('token', response.first_name);
        this._authservice.isLoginSubject.next(true);
        this._authservice.isCurrentUserSubject.next(response.first_name);
    
        this._cdr.markForCheck();
        this._router.navigate(['/']);
      } else if (response.status === 'not_authorized') {
        console.log('but has not authenticated your app');
      }

    });
    } else {
    console.log('User cancelled login or did not fully authorize.');
    }
  }, { scope: 'public_profile,email,user_friends' });
}

checkLoginState() {
 
    FB.getLoginStatus( (response) => {
      if (response.status === 'connected') {
        console.log('fb connected. Getting details.');
  
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
  
        this.me();
        this.additionalinfo();
        
  
        localStorage.setItem('token', response.first_name);
        this._authservice.isLoginSubject.next(true);
        this._authservice.isCurrentUserSubject.next(response.first_name);
     
        this._cdr.markForCheck();
        this._router.navigate(['/']);
      } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook, 
        // but has not authenticated your app
        console.log('but has not authenticated your app');
      } else {
        console.log('fb not connected. calling login popup.');
        FB.login((response: any) => {
          console.log("pop up called..");
          if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
              console.log('Good to see you, ' + response.name + '.');
              localStorage.setItem('token', response.first_name);
              this._authservice.isLoginSubject.next(true);
              this._authservice.isCurrentUserSubject.next(response.first_name);
              this._cdr.markForCheck();
              this._router.navigate(['/']);
              
            });
          } else {
            console.log('User cancelled login or did not fully authorize.');
           }
         
        }, { scope: 'public_profile,email,user_friends' });
        }
  
  });
}

me() {
  console.log("calling me function");
   FB.api('/me', function(response) {
      console.log('Successful id for: ' + response.id);
   });
 }


additionalinfo() {
  console.log("me function");
 FB.api('/me?fields=id,name,first_name,gender,picture.width(150).height(150),age_range,friends',
   function (result) {
     if (result && !result.error) {
       this.user = result;
       console.log(this.user);
     } else {
       console.log(result.error);
     }
   });
  }


  //fb new end

  FBLogin() {
   console.log("called fblogin.");
   FB.getLoginStatus(response => {
    console.log("got fb login status response.", response);

    if (response.status === 'connected') {
      console.log('fb connected. Getting details.');

      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;

      this.me();
      this.additionalinfo();
      

      localStorage.setItem('token', response.first_name);
      this._authservice.isLoginSubject.next(true);
      this._authservice.isCurrentUserSubject.next(response.first_name);
   
      this._cdr.markForCheck();
      this._router.navigate(['/']);
    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook, 
      // but has not authenticated your app
      console.log('but has not authenticated your app');
    } else {
      console.log('fb not connected. callinf login popup.');
    //  FB.login((response: any) => {
        FB.login(function(response) {
        console.log("pop up called..");
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', function(response) {
            console.log('Good to see you, ' + response.name + '.');
            localStorage.setItem('token', response.first_name);
            this._authservice.isLoginSubject.next(true);
            this._authservice.isCurrentUserSubject.next(response.first_name);
            this._cdr.markForCheck();
            this._router.navigate(['/']);
            
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
         }
       
      }, { scope: 'public_profile,email,user_friends' });
      }


   });
  }


    public loadgoogle() {
      console.log('f.....');
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '439913440733-t6cr4vc7l6r8go95npbjgsui4goknm62.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        console.log('f.....1111');
        this.attachSignin(document.getElementById('googleBtn'));
      });
    }

     attachSignin(element) {
      console.log(element.id);
      this.auth2.attachClickHandler(element, {},
      (googleUser) => {
      console.log('1234');
        let profile = googleUser.getBasicProfile();

        console.log('Token || ' + profile.getId());
        console.log('Good to see you, ' + profile.getName() + '.');
            localStorage.setItem('token', profile.getName());
           
           
      });

    }

}

