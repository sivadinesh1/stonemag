import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
