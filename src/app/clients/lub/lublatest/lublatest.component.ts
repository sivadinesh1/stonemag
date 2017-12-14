import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ArticleService } from '../../../service/article.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-lublatest',
  templateUrl: './lublatest.component.html',
  styleUrls: ['./lublatest.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LublatestComponent implements OnInit {
  articles: Array<any>;
  domain = environment.domain;
  headers:any;
  link = "magazine/lub/post";
  constructor(private _articleService: ArticleService,private _cdr: ChangeDetectorRef) { }

  ngOnInit() {

    this. headers =  { "mainhead": "LUB Karnataka", "subhead": "LUB KARNATAKA. BANGALORE. NOVEMBER 2017, ISSUE 3", 
    "shortdesc": "Laghu Udyog Bharati is a not for profit Pan India Organisation with the aim of empowering Micro and Small enterprises in India", "link": "magazine/lub" };
    
    this._articleService.getArticlesByMagazineIssueId('lub','3')      
    .subscribe(
      data => {
        
        this.articles = data;
        this._cdr.markForCheck();
        
      },
            error => console.error(error)

    );
    
  }

}
