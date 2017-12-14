import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class AppComponent implements OnInit {
  title = 'app';

    constructor(private _router: Router) { 
        console.log('where r u from >> ' + window.location.hostname);

    }

    ngOnInit() {

        // this._router.routeReuseStrategy.shouldReuseRoute = function(){
        //     return false;
        // };
        
        this._router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                this._router.navigated = false;
                window.scrollTo(0, 0);
            }
        });
    }
}



