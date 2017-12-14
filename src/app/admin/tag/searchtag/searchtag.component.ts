import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';

import { Tag } from '../../../domain/tag.interface';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { ArticleService } from '../../../service/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchtag',
  templateUrl: './searchtag.component.html',
  styleUrls: ['./searchtag.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchtagComponent implements OnInit {


  dataSource = new MatTableDataSource<Tag>();
  displayedColumns = ['id', 'name'];

  pageSize = 15;
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
    
    
        this._articleservice.getAllTags().subscribe(data => {
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
        this._router.navigate(['/auth/edittag/'+category.id]);
      }
    
            

}
