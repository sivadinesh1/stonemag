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
  selector: 'app-digitalpengalblog',
  templateUrl: './digitalpengalblog.component.html',
  styleUrls: ['./digitalpengalblog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigitalpengalblogComponent implements OnInit {
  story: { title: string };
  paramsSubscription: Subscription;
  article: any;
  // articleurl: any;
  articleimgurl: any;

  domain = environment.domain;
  backendUrl = environment.backendUrl;
  headers:any;
  public headline: string = 'title';
  link = "magazine/digitalpengal/post";

  constructor(private route: ActivatedRoute,
    private _articleService: ArticleService, private pipe: UrlidPipe,
    private titleService: Title, private zone: NgZone,
    private metaService: Meta, private _cdr: ChangeDetectorRef
  ) {
  }


  ngOnInit() {
    this.story = { title: this.route.snapshot.params['title'] };

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
          { property: 'og:site_name', content: this.domain + '/digitalpengal' },
          { property: 'og:url', content: this.domain + '/digitalpengal/post/' + this.story.title },
          { property: 'og:description', content: this.article.description },
          { property: 'og:image', content: this.articleimgurl },
          { property: 'og:title', content: this.article.title },
        ]);

        if(this.article.language !== 'English') {
          this.titleService.setTitle(this.article.regionaltitle);
        } else {
          this.titleService.setTitle(this.article.title);
        }
        this._cdr.markForCheck();
      },
      (data: any[]) => console.log(data)
      );

      this. headers =  { "mainhead": "டிஜிடல் பெண்கள்", "subhead": "நாளைய பெண்களுக்கான இன்றைய டிஜிட்டல் பதிவுகள் ", 
      "shortdesc": "நாளைய பெண்களுக்கான இன்றைய டிஜிட்டல் பதிவுகள் ", "link": "magazine/digitalpengal" };

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
      href: this.domain + '/digitalpengal/post/' + this.story.title,
    }, function (response) { });
  }

}
