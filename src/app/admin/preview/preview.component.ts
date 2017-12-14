import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs/Rx';
import { NavigationEnd, Router, Params, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ArticleService } from '../../service/article.service';
import { UrlidPipe } from '../../util/pipe/url-id.pipe';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  story: { title: string };
  paramsSubscription: Subscription;
  article: any;

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

      

        this.titleService.setTitle(this.article.title);
        this._cdr.detectChanges();
      },
      (data: any[]) => console.log(data)
      );

    
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
