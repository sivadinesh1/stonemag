import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Header } from '../../domain/header.interface';
@Component({
  selector: 'app-header-blog',
  templateUrl: './header-blog.component.html',
  styleUrls: ['./header-blog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderBlogComponent implements OnInit {
  @Input('mainhead') mainhead: string;
  @Input('subhead') subhead: string;

  

  @Input() header: Header;
  constructor() { }

  ngOnInit() {
  }

}
