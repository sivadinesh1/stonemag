import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ArticleService } from '../../service/article.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { Article } from '../../domain/article.interface';



@Component({
  selector: 'app-searchpost',
  templateUrl: './searchpost.component.html',
  styleUrls: ['./searchpost.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchpostComponent implements OnInit {
  urlpath: { magname: string };
  paramsSubscription: Subscription;


  dataSource = new MatTableDataSource<Article>();
  displayedColumns = ['id', 'title', 'regionaltitle'];

  pageSize = 25;
  pageSizeOptions = [50, 100];
  pageLength = 0;
  pageIndex = 0;

  pageEvent: PageEvent;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _articleservice: ArticleService, private _router: Router,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.urlpath = { magname: this._route.snapshot.params['magname'] };
    
        this.paramsSubscription = this._route.params
          .subscribe(
          (params: Params) => {
            this.urlpath.magname = params['magname'];
          }
          );
    
        this._route.fragment.subscribe();

console.log('mag name...'+ this.urlpath.magname);

     this._articleservice.getArticlesByMagazine(this.urlpath.magname).subscribe(data => {
      this.dataSource.data = data;
      
      this.dataSource.sort = this.sort;
      this.pageLength = data.length
      
      this._cdr.markForCheck();
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this._cdr.markForCheck();
  }

  onPaginateChange(event){
    const startIndex = event.pageIndex * event.pageSize; 
    this._cdr.markForCheck();
    //fetch server side pagination values. call service methods. use startindex + limits in java query. load result to datasource
  }

  onClick(event: Event, article): void {
    event.preventDefault(); // Prevents browser follo
    this._cdr.markForCheck();
    this._router.navigate(['/auth/editpost/'+article.id]);
  }

  onClickPreview(event: Event, article): void {
    event.preventDefault(); // Prevents browser follo
    this._cdr.markForCheck();
    this._router.navigate(['/auth/preview/'+article.id]);
  }


}
