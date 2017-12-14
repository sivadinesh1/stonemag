import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Header } from '../../domain/header.interface';

@Component({
  selector: 'app-header-mag',
  templateUrl: './header-mag.component.html',
  styleUrls: ['./header-mag.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderMagComponent implements OnInit {
  
  
  @Input('mainhead') mainhead: string;
  @Input('subhead') subhead: string;

  

  @Input() header: Header;
  
  constructor() { }

  ngOnInit() {
  }

}
