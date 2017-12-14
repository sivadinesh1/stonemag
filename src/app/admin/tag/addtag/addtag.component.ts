import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticleService } from '../../../service/article.service';
import { Router } from '@angular/router';
import { Tag } from '../../../domain/tag.interface';

@Component({
  selector: 'app-addtag',
  templateUrl: './addtag.component.html',
  styleUrls: ['./addtag.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddtagComponent implements OnInit {
  apiresponse: any;
  tag: Tag  = {};
  
    @ViewChild('f') addTagForm: NgForm;
    responsemsg;

    constructor(private _articleservice: ArticleService, 
      private _router: Router, private _cdr: ChangeDetectorRef
      
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.tag.name = this.addTagForm.value.name;

    this._articleservice.addtag(this.tag).subscribe(
      data => {
       this.apiresponse = data;
       if(this.apiresponse.message === 'TAG_EXIST') {
        this.responsemsg = "TAG Already Exists.";
       } else if(this.apiresponse.message === 'success') {
           this.responsemsg = "TAG Added.";
           this.addTagForm.reset();
          
           setTimeout(() => {
             this._router.navigate(['/auth/addtag']);
          }, 3000);

       } else if(this.apiresponse.message === 'error') {
         console.log("Something went wrong. Contact Administrator");
         this.responsemsg = "Posting failed. Correct errors and Repost";
       } else {
         console.log("Iam lost while adding tag.");
       }
       this._cdr.markForCheck();
      }
    );
  }
}
