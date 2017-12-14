import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ArticleService } from '../../../service/article.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-digitalpengallatest',
  templateUrl: './digitalpengallatest.component.html',
  styleUrls: ['./digitalpengallatest.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigitalpengallatestComponent implements OnInit {
  articles: Array<any>;
  domain = environment.domain;
  headers:any;
  link = "magazine/digitalpengal/post";
  sublink="magazine/digitalpengal";

  story: { category: string };
  paramsSubscription: Subscription;

  constructor(private _articleService: ArticleService, private route: ActivatedRoute,
    private _cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this. headers =  { "mainhead": "டிஜிடல் பெண்கள்", "subhead": "நாளைய பெண்களுக்கான இன்றைய டிஜிட்டல் பதிவுகள் ", 
    "shortdesc": "நாளைய பெண்களுக்கான இன்றைய டிஜிட்டல் பதிவுகள் ", "link": "magazine/digitalpengal" };

    this.story = { category: this.route.snapshot.params['category'] };
    
        this.paramsSubscription = this.route.params
          .subscribe(
          (params: Params) => {
            this.story.category = params['category'];
          }
          );
    
        this.route.fragment.subscribe();
    
    this._articleService.getArticlesByMagazine('digitalpengal')      
    .subscribe(
      data => {
        let articletemp = data;
        this.articles = articletemp;
        // this._cdr.detectChanges();
        this._cdr.markForCheck();
        
      },
            error => console.error(error)

    );
    
  }

  trackByFn(index, item) {
    return index;
  }

}
