import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ArticleService } from '../../../service/article.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-skandagurulatest',
  templateUrl: './skandagurulatest.component.html',
  styleUrls: ['./skandagurulatest.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkandagurulatestComponent implements OnInit {
  articles: Array<any>;
  domain = environment.domain;
  headers:any;
  link = "magazine/skandaguru/post";
  sublink="magazine/skandaguru";

  story: { category: string };
  paramsSubscription: Subscription;
  
  constructor(private _articleService: ArticleService,
    private route: ActivatedRoute,
    private _cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this. headers =  { "mainhead": "ஸ்கந்தகுரு", "subhead": "நாளைய தலைமுறைக்கான இன்றைய ஆன்மீக டிஜிட்டல் பதிவுகள்", 
    "shortdesc": "நாளைய தலைமுறைக்கான இன்றைய ஆன்மீக டிஜிட்டல் பதிவுகள்", "link": "magazine/skandaguru" };
    
    this.story = { category: this.route.snapshot.params['category'] };
    
        this.paramsSubscription = this.route.params
          .subscribe(
          (params: Params) => {
            this.story.category = params['category'];
          }
          );
    
        this.route.fragment.subscribe();

        this._articleService.getArticlesByMagazine('skandaguru')      
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

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
