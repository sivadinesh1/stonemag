import { Component, OnInit, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router, Params, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ArticleService } from '../../../service/article.service';
import { UrlidPipe } from '../../../util/pipe/url-id.pipe';
import { Meta } from '@angular/platform-browser';

declare let $: any;
declare var FB: any;

@Component({
  selector: 'app-lubblog',
  templateUrl: './lubblog.component.html',
  styleUrls: ['./lubblog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LubblogComponent implements OnInit {
  story: { title: string };
  paramsSubscription: Subscription;
  article: any;
  articleurl: any;
  articleimgurl: any;
  
  domain = environment.domain;
  backendUrl = environment.backendUrl;

  public headline: string = 'title';
  headers:any;
  link = "magazine/lub/post";

  constructor(private route: ActivatedRoute,
    private _articleService: ArticleService, private pipe: UrlidPipe, 
    private titleService: Title,  private zone: NgZone,
    private metaService: Meta, private _cdr: ChangeDetectorRef
  ) {
  }


  ngOnInit() {
    this.story = { title: this.route.snapshot.params['title'] };
    console.log('YYYYYYBBB'+ this.story);

        this.paramsSubscription = this.route.params
          .subscribe(
          (params: Params) => {
            this.story.title = params['title'];
          }
          );
    
        this.route.fragment.subscribe();
    
        const articleid = this.pipe.transform(this.story.title)
  
        this._articleService.getArticlebyid(articleid)
          .subscribe(
            
          data => {
            
            this.article = data;
            
            this.metaService.addTags([
              { name: 'title', content: this.article.title },
              { name: 'description', content: this.article.description },
              
              { property: 'og:type', content: 'article' },
              { property: 'og:site_name', content: this.domain +'/lub' },
              { property: 'og:url', content: this.domain +'/lub/post/' + this.story.title },
              { property: 'og:description', content: this.article.description},
              { property: 'og:image', content: this.articleimgurl},
              { property: 'og:title', content: this.article.title},
            ]);

            this.titleService.setTitle(this.article.title);
            this._cdr.markForCheck();
          },
          (data: any[]) => console.log(data)
          );

          this.headers =  { "mainhead": "LUB Karnataka", "subhead": "LUB KARNATAKA. BANGALORE. NOVEMBER 2017, ISSUE 3", 
          "shortdesc": "Laghu Udyog Bharati is a not for profit Pan India Organisation with the aim of empowering Micro and Small enterprises in India", "link": "magazine/lub" };
          

  }
  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  fbshare() {
    FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: this.domain +'/lub/post/' + this.story.title,
    }, function(response){}); 
  }

}
