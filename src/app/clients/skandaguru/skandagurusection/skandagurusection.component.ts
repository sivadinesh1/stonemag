import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ArticleService } from '../../../service/article.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-skandagurusection',
  templateUrl: './skandagurusection.component.html',
  styleUrls: ['./skandagurusection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkandagurusectionComponent implements OnInit {
  articles: Array<any>;
  domain = environment.domain;
  headers:any;
  link = "magazine/skandaguru/post";
  sublink="magazine/skandaguru";
  story: { category: string };
  paramsSubscription: Subscription;
  category;

  constructor(private _articleService: ArticleService, private route: ActivatedRoute,
    private _cdr: ChangeDetectorRef) { }

   

  ngOnInit() {

    this. headers =  { "mainhead": "ஸ்கந்தகுரு", "subhead": "நாளைய தலைமுறைக்கான இன்றைய ஆன்மீக டிஜிட்டல் பதிவுகள்", 
    "shortdesc": "நாளைய தலைமுறைக்கான இன்றைய ஆன்மீக டிஜிட்டல் பதிவுகள்", "link": "magazine/skandaguru" };

    this.story = { category: this.route.snapshot.params['category'] };
    
        this.paramsSubscription = this.route.params
          .subscribe(
          (params: Params) => {
            this.story.category = params['category'];

            this.route.fragment.subscribe();
            this._cdr.markForCheck();

            this._articleService.getArticlesByCategories("TAMIL",this.story.category,'skandaguru')      
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
