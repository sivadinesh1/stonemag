import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ArticleService } from '../../../service/article.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-digitalpengalsection',
  templateUrl: './digitalpengalsection.component.html',
  styleUrls: ['./digitalpengalsection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DigitalpengalsectionComponent implements OnInit {
  articles: Array<any>;
  domain = environment.domain;
  headers:any;
  link = "magazine/digitalpengal/post";
  sublink="magazine/digitalpengal";
  story: { category: string };
  paramsSubscription: Subscription;
  category;

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

            this.route.fragment.subscribe();
            this._cdr.markForCheck();

            this._articleService.getArticlesByCategories("TAMIL",this.story.category,'digitalpengal')      
            .subscribe(
              data => {
                this.articles = data;
                this._cdr.markForCheck();
              },
                error => console.error(error)
              );
            }
          
          );
  }

  trackByFn(index, item) {
    return index;
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
