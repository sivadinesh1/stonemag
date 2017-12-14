import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { environment } from '../../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopicComponent implements OnInit {
  story: { categoryname: string, language: string };
  paramsSubscription: Subscription;
  articles: any;
  domain = environment.domain;
  backendUrl = environment.backendUrl;
  category: any;

  constructor(private route: ActivatedRoute, private _articleService: ArticleService,
    private _cdr: ChangeDetectorRef,private titleService: Title,
  ) { }

  ngOnInit() {
    this.story = { categoryname: this.route.snapshot.params['categoryname'], language: this.route.snapshot.params['language'] };
    
        this.paramsSubscription = this.route.params
          .subscribe(
          (params: Params) => {
            this.story.categoryname = params['categoryname'];
            this.story.language = params['language'];
          }
          );
    
        this.route.fragment.subscribe();

        console.log('abcd 1>>' + this.story.categoryname);
        console.log('abcd 2>>' + this.story.language);

        this._articleService.getCategoryByName(this.story.categoryname)
        .subscribe(
          
                data => {
          
                  this.category = data;
          
              
                //  this.titleService.setTitle(this.article.title);
                  this._cdr.markForCheck();
                },
                (data: any[]) => console.log(data)
                );
        
        
        this._articleService.getArticlesByCategoriesLanguage(this.story.language, this.story.categoryname)
        .subscribe(
  
        data => {
  
          this.articles = data;
  
      
        //  this.titleService.setTitle(this.article.title);
          this._cdr.markForCheck();
        },
        (data: any[]) => console.log(data)
        );
  }

}
