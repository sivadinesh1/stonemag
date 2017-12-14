import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { environment } from '../../../environments/environment';
import { Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExploreComponent implements OnInit {
story: { language: string };
paramsSubscription: Subscription;

limit:string = '50';
categories: Array<any>;
domain = environment.domain;
language;

  constructor(private _articleservice: ArticleService, private route: ActivatedRoute,
    private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.story = { language: this.route.snapshot.params['language'] };
    
    this.paramsSubscription = this.route.params
      .subscribe(
      (params: Params) => {
        
        this.language = params['language'];
        this._cdr.markForCheck();
      }
      );

    this.route.fragment.subscribe();
    console.log('asdf'+ this.limit);
    this._articleservice.getAllCategoriesByLimt(this.limit).subscribe(data => {
      
      this.categories = data;
      this._cdr.markForCheck();
      
      
    });
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
