import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sticky-footer',
  templateUrl: './sticky-footer.component.html',
  styleUrls: ['./sticky-footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StickyFooterComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

}
