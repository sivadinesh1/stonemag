import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Article } from '../../domain/article.interface';
import { ArticleService } from '../../service/article.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'listpost',
  templateUrl: './listpost.component.html',
  styleUrls: ['./listpost.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListpostComponent implements OnInit {

  @ViewChild('f') addArticleForm: NgForm;
  
  magazines: Array<any>;
  selectedMagazine: string = "";

  
  
  constructor(private _articleservice: ArticleService, private _router: Router,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._articleservice.getMags()      
    .subscribe(
      data => {        
        this.magazines = data;
        this._cdr.markForCheck();
      },
            error => console.error(error)
    );
  }

  ngAfterViewInit() {
  
  }
  onSubmit() {
    this.selectedMagazine = this.addArticleForm.value.magazine;
    console.log(this.addArticleForm.value.magazine);
    this._cdr.markForCheck();
    this._router.navigate(['/auth/search/'+this.selectedMagazine]);

    
  }
  trackByFn(index, item) {
    return index;
  }

}

