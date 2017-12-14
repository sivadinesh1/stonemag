import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
declare let $ : any;

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    
   }

}
