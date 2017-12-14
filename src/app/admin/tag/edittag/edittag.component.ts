import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../../service/article.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-edittag',
  templateUrl: './edittag.component.html',
  styleUrls: ['./edittag.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EdittagComponent implements OnInit {

  @ViewChild('f') editTagForm: NgForm;
  urlpath: { tagid: string };
  paramsSubscription: Subscription;
  selectedtags:any;
  tag: any;
  tags: any;
  apiresponse: any;
  responsemsg;

  constructor(private _articleservice: ArticleService,  private _router: Router, 
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef
    
    
  ) { 

  }

  ngOnInit() {
    this.urlpath = { tagid: this._route.snapshot.params['tagid'] };
    
        this.paramsSubscription = this._route.params
          .subscribe(
          (params: Params) => {
            this.urlpath.tagid = params['tagid'];
          }
          );
    
        this._route.fragment.subscribe();
  }

  ngAfterViewInit() {
    this._articleservice.getTagById(this.urlpath.tagid)
    .subscribe(
    data => {
      this.tag = data;
      this._cdr.markForCheck();
    },
    (data: any[]) => console.log(data)
    );
}

ngOnDestroy() {
  this.paramsSubscription.unsubscribe();
}

onSubmit() {
  this.tag.name = this.editTagForm.value.name;


  this._articleservice.edittag(this.tag).subscribe(
    data => {
     this.apiresponse = data;
     if(this.apiresponse.message === 'success') {
       
       this.responsemsg = "Tag Edit Completed";
       
       this.editTagForm.reset();

       setTimeout(() => {
         this._router.navigate(['/auth/listtag/']);
      }, 3000);

   } else if(this.apiresponse.message  === 'error') {
     console.log("Something went wrong. Contact Administrator");
     this.responsemsg = "Posting failed. Correct errors and Repost";
   } else {
     console.log("Iam lost while editing tag.");
   }    
   this._cdr.markForCheck();     
    }          
  );   

}

}
