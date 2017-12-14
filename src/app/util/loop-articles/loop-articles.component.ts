import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Article } from '../../domain/article.interface';
@Component({
  selector: 'app-loop-articles',
  templateUrl: './loop-articles.component.html',
  styleUrls: ['./loop-articles.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoopArticlesComponent implements OnInit {
  today: any;
  domain = environment.domain;
  langu= 'English';
  //  @Input() article:  {'articleimg': '', 'body': '',
  //  'title': '', 'description':'', 'id': '', 'coverimg': '', 'tags': '', 'createddatetime': '', 'user':{'username':'', 'firstName':''},'category':''
  //  };

  //@Input() article: Article;
  @Input() article: Article = {};
  name="";
  
  @Input() link: any;
  
  dash= '-';
  constructor() { 
    
  }

  ngOnInit() {
  }

}
