import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ArticleService } from '../../../service/article.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../../domain/category.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-searchcategory',
  templateUrl: './searchcategory.component.html',
  styleUrls: ['./searchcategory.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchcategoryComponent implements OnInit {

  dataSource = new MatTableDataSource<Category>();
  displayedColumns = ['id', 'language' ,'category', 'tags', 'description'];

  pageSize = 50;
  pageSizeOptions = [100, 150];
  pageLength = 0;
  pageIndex = 0;

  pageEvent: PageEvent;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _articleservice: ArticleService, private _router: Router,
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {


    this._articleservice.getAllCategories().subscribe(data => {
      this.dataSource.data = data;
      
      this.dataSource.sort = this.sort;
      this.pageLength = data.length
      
      this._cdr.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  onClick(event: Event, category): void {
    event.preventDefault(); // Prevents browser follo
    this._cdr.markForCheck();
    this._router.navigate(['/auth/editcategory/'+category.id]);
  }

  


}
