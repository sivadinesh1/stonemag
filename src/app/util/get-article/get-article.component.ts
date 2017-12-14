import { Component, OnInit, Input, OnChanges, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Article } from '../../domain/article.interface';
import {DomSanitizer} from '@angular/platform-browser';

declare var FB: any;
declare let webGlObject: any;
declare let $ : any;
@Component({
  selector: 'app-get-article',
  templateUrl: './get-article.component.html',
  styleUrls: ['./get-article.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GetArticleComponent implements OnInit, OnChanges {
  today: any;
  domain = environment.domain;
  articleimgurl: any;

  articleurl: any;
  whatsappurl: any;
  backendUrl = environment.backendUrl;

  //public article: Article = {};
  @Input() article: Article = {};

  //@Input() article: Article;
  @Input() link: any;

  dash= '-';

  constructor(private _sanitizer:DomSanitizer, private _cdr: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    
  }

  sanitize(url:string){
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnChanges() {
    setTimeout(()=>{

      this.articleurl = this.domain + "/" + this.link + "/" + this.convertToSlug(this.article.title) + "-" + this.article.id;
      this.whatsappurl = this.sanitize("whatsapp://send?text=" + this.backendUrl + "/api/article/seometainfo?title=" + this.convertToSlug(this.article.title)+ "-" + this.article.id);

      this.articleimgurl = this.domain + this.article.coverimg;
      this._cdr.markForCheck();
    }, 2000); 
  }
  
  convertToSlug(Text)
  {
      return Text
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'')
          ;
  }

  fbshare() {
    FB.ui({
      method: 'share',
      display: 'popup',
      href: this.articleurl,
    }, function(response){}); 
  }

}
