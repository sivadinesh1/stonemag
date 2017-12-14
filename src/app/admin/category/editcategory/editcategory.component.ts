import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ArticleService } from '../../../service/article.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Language } from '../../../domain/language.interface';
import { LanguageService } from '../../../service/language.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditcategoryComponent implements OnInit {
  @ViewChild('f') editCategoryForm: NgForm;
  urlpath: { categoryid: string };
  paramsSubscription: Subscription;
  selectedtags:any;
  category: any;
  tags: any;
  apiresponse: any;
  responsemsg;
  public languages: Language[];
  selectedLanguage: any;

  constructor(private _articleservice: ArticleService,  private _router: Router, 
    private _route: ActivatedRoute, private _cdr: ChangeDetectorRef,
    private _languageService: LanguageService, 
    
    
  ) { 

  }

  ngOnInit() {
    
        this.urlpath = { categoryid: this._route.snapshot.params['categoryid'] };
        
            this.paramsSubscription = this._route.params
              .subscribe(
              (params: Params) => {
                this.urlpath.categoryid = params['categoryid'];
              }
              );
        
            this._route.fragment.subscribe();
            this.languages =  this._languageService.getLanguages();
      }

      ngAfterViewInit() {
          this._articleservice.getCategoryById(this.urlpath.categoryid)
          .subscribe(
          data => {
            this.category = data;
            this.selectedtags = this.category.tags;
            this.selectedLanguage = this.category.language;
            this._cdr.markForCheck();
          },
          (data: any[]) => console.log(data)
          );
      }

      ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
      }

      onSubmit() {
        this.category.name = this.editCategoryForm.value.name;
        this.category.description = this.editCategoryForm.value.description;
        this.category.tags = this.editCategoryForm.value.tags;
        this.category.language = this.editCategoryForm.value.language;
      
        this._articleservice.editcategory(this.category).subscribe(
          data => {
           this.apiresponse = data;
           if(this.apiresponse.message === 'success') {
             
             this.responsemsg = "Category Edit Completed";
             
             this.editCategoryForm.reset();
   
             setTimeout(() => {
               this._router.navigate(['/auth/listcategory/']);
            }, 3000);
   
         } else if(this.apiresponse.message  === 'error') {
           console.log("Something went wrong. Contact Administrator");
           this.responsemsg = "Posting failed. Correct errors and Repost";
         } else {
           console.log("Iam lost while editing category.");
         }    
         this._cdr.markForCheck();     
          }          
        );   

      }

      handleInputChange (event) {
       
        var image = event.target.files[0];
      
        var pattern = /image-*/;
        var reader = new FileReader();
      
        if (!image.type.match(pattern)) {
            console.error('File is not an image');
            //of course you can show an alert message here
            return;
        }
       
        this.addcategoryimage(image);
      
      }

      addcategoryimage(image) {
        let headers = new HttpHeaders();
        
         headers = headers.set('Authorization', this.category.toString());
        
         
         const formData = new FormData();
           formData.append("image", image);
       
           this._articleservice.addcategorypic(this.category.id, formData, headers)
           .subscribe(
           data => {
             this.responsemsg = data;
         
             if(this.responsemsg.message === 'success') {
               this.responsemsg = "Cover Image successfully uploaded.";
             } else if (this.responsemsg.message === 'Max File Size') {
               this.responsemsg = "Max File size should be < 2MB.";
             }
             this._cdr.markForCheck();
           },
           (data: any[]) => console.log(data)
           ),
           (err: HttpErrorResponse) => {
             if (err.error instanceof Error) {
               console.log("Client-side error occured.");
             } else {
               console.log("Server-side error occured.");
             }
           }
      }

}
