import { Component, OnInit, ViewChild, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { AuthService } from '../auth.service';

declare let $: any;
declare var gapi: any;
 
declare var window: any;
declare var FB: any;

declare let webGlObject: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', '../auth-style.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  responsemsg: any;

  @ViewChild('f') signupForm: NgForm;

  loggedIn: boolean;

  public auth2: any;

  emailsignup = [
    {
      fullname: '',
      email: '',
      password: '',
      source: ''
    }
  ]

  socialsignup = [
    {
      fullname: '',
      tokenid: '',
      source: ''
    }
  ]

 apiresponse: any;

  currentUrl: string;

  constructor(private _authservice: AuthService, private _router: Router,
    private _zone: NgZone, private _location: Location, private _cdr: ChangeDetectorRef
  ) {



    // if (localStorage.getItem('userLoggedIn') == '' ||
    //   localStorage.getItem('userLoggedIn') == null
    // ) {
    //   this.loggedIn = false;
    // } else {
    //   this.loggedIn = true;
    // }

  }

  ngOnInit() {
    $(function () {
      $('.parallax').parallax();
      var height = $(window).height();

      $('#container').css({ 'height': height + 'px' });


    }); // end of document ready

    this.currentUrl = this._router.url;
  }

  onSubmit() {

    console.log('fffffffful.va..' + this.signupForm.value.fullname);

    this.emailsignup[0].fullname = this.signupForm.value.fullname;
    this.emailsignup[0].email = this.signupForm.value.email;
    this.emailsignup[0].password = this.signupForm.value.password;
    this.emailsignup[0].source = 'EM';



    this._authservice.emailsignup(this.emailsignup).subscribe(
      data => {
     
        this.apiresponse = data;
     console.log('ABCD..'+ this.apiresponse.message);
        if (this.apiresponse.message === 'DP-EMAIL') {
          this.responsemsg = "Email Already Exists";
        } else if (this.apiresponse.message === 'DP-USERNAME') {
            this.responsemsg = "Username Already Exists";  
        } else if (this.apiresponse.message === 'SUCCESS') {

          localStorage.setItem('token', this.emailsignup[0].fullname);
          this._authservice.isLoginSubject.next(true);
          this._authservice.isCurrentUserSubject.next(this.emailsignup[0].fullname);

          console.log("user  created.. successfuly");
          this._cdr.markForCheck();
          // localStorage.setItem('currentUser', this.emailsignup[0].fullname);
          // this._cdr.detectChanges();
          this._router.navigate(['/']);
        }

      }

    );

  }

// logout() {
//     this._authservice.logout().subscribe(
//       res => {
//       },
//       err => console.log(err)
//     );
//     location.reload();
//     this._router.navigate(['/signin']);
//   }


 

  ngAfterViewInit() {

  }

  fbsignup() {
    FB.login(function(response) {
      if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
        if (response.status === 'connected') {
          localStorage.setItem('token', response.first_name);
          this._authservice.isLoginSubject.next(true);
          this._authservice.isCurrentUserSubject.next(response.first_name);
      
          this._cdr.markForCheck();

          this.socialsignup[0].fullname = response.first_name;
          this.socialsignup[0].token = response.authResponse.accessToken;
          
          this.socialsignup[0].source = 'FB';

          this._authservice.fbsignup(this.socialsignup).subscribe(
           data => {
             console.log('fb sign up success...');
           });

          this._router.navigate(['/']);
        } else if (response.status === 'not_authorized') {
          console.log('but has not authenticated your app');
        }
  
      });
      } else {
      console.log('User cancelled login or did not fully authorize.');
      }
    });
  }
  

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
       localStorage.setItem('currentUser', response.first_name); 
       this._cdr.markForCheck();
       this._router.navigate(['/']);
     } else if (response.status === 'not_authorized') {
       // the user is logged in to Facebook, 
       // but has not authenticated your app
       console.log('but has not authenticated your app');
     } else {
       console.log('fb not connected. callinf login popup.');
       FB.login((response: any) => {
         console.log("pop up called..");
         if (response.authResponse) {
           console.log('Welcome!  Fetching your information.... ');
           FB.api('/me', function(response) {

             console.log('Good to see you, ' + response.name + '.');
             localStorage.setItem('currentUser', response.first_name); 
             this._cdr.markForCheck();
             
             
             this.socialsignup[0].fullname = response.first_name;
             this.socialsignup[0].tokenid = response.authResponse.accessToken;
             
             this.socialsignup[0].source = 'FB';

             this._authservice.socialsignup(this.socialsignup).subscribe(
              data => {
                console.log('fb sign in success...');
              });
             
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
        // console.log('Successful login for: ' + response.name);
        // console.log('Successful email for: ' + response.email);
        // console.log('Successful id for: ' + response.id);
        // console.log('Successful gender for: ' + response.gender);
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

        this.socialsignup[0].fullname = profile.fgetName();
        this.socialsignup[0].tokenid = profile.getId();
        
        this.socialsignup[0].source = 'GP';

        this._authservice.socialsignup(this.socialsignup).subscribe(
         data => {
           console.log('fb sign in success...');
         });
        

        console.log('Good to see you, ' + profile.getName() + '.');
            localStorage.setItem('token', profile.getName());
           
           
      });

    }

}
