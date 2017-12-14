import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import '../../../assets/js/init.js';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


declare let webGlObject: any;
declare let $ : any;


@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})


export class MenubarComponent implements OnInit {
  
  //currentUser: String;
  isLoggedIn : Observable<boolean>;
  isCurrentUser : Observable<string>;

  constructor( private _cdr: ChangeDetectorRef, private _authservice: AuthService, private _router: Router ) { 
    this.isLoggedIn = _authservice.isLoggedIn();
    this.isCurrentUser = _authservice.getCurrentUser();
  }

  ngOnInit() { }

  ngAfterViewInit() { 
    webGlObject.init();
    webGlObject.gnalytics();
    webGlObject.gadsence();
    webGlObject.fbinit();
    webGlObject.glogin();
    
    //$('div[id^=sidenav-overlay]').remove();
    

    // this._cdr.markForCheck();
    // this.currentUser = localStorage.getItem('currentUser');
  
    // this._cdr.detectChanges();
    // console.log('console log: '+this.currentUser);

  //    setTimeout(()=>{
  //     // $(".dropdown-button").dropdown();  
  //     $('.dropdown-button').dropdown({
  //       inDuration: 300,
  //       outDuration: 225,
  //       hover: true, // Activate on hover
  //       belowOrigin: true, // Displays dropdown below the button
  //       alignment: 'right' // Displays dropdown with edge aligned to the left of button
  //     }
  //   );
  //     console.log('page measured height '); // page height is coming
    
  // }, 20); 

  }


  // ngOnChanges() {
  //   setTimeout(()=>{
  //     $(".dropdown-button").dropdown();  
  //     console.log('page measured height '); // page height is coming
    
  // }, 0); 

  // }

  onClick(event: Event): void {
    event.preventDefault(); // Prevents browser following the link
    
    this._authservice.logout().subscribe(
      res => {
      },
      err => console.log(err)
      );
      
      localStorage.removeItem('token');
      localStorage.clear();
      this._authservice.isLoginSubject.next(false);
      this._authservice.isCurrentUserSubject.next('');
      console.log(this._router.url);
      
      $(".button-collapse").off("click").sideNav({
        menuWidth: 300,
        edge: 'left',
        closeOnClick: true,
        draggable: true
      });
      
      this._cdr.markForCheck();
      this._router.navigate([this._router.url]);
}

removeSideNav(event: Event, goto) {
   event.preventDefault(); 
  
   $(".button-collapse").off("click").sideNav({
    menuWidth: 300,
    edge: 'left',
    closeOnClick: true,
    draggable: true
  });
  this._cdr.markForCheck();
   this._router.navigate(["/" + goto]);
  
}



}
