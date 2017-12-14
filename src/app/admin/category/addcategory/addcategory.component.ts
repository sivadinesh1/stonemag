import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ArticleService } from '../../../service/article.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Category } from '../../../domain/category.interface';
import { Language } from '../../../domain/language.interface';
import { LanguageService } from '../../../service/language.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddcategoryComponent implements OnInit {
  apiresponse: any;

  category: Category  = {};
  public languages: Language[];
  
    @ViewChild('f') addCategoryForm: NgForm;
    responsemsg;
    imagebaseurl = environment.imagebaseurl;
    
  tags: any;
  constructor(private _articleservice: ArticleService, private _languageService: LanguageService, 
    private _router: Router, private _cdr: ChangeDetectorRef
    
  ) { }

  ngOnInit() {
    this.languages =  this._languageService.getLanguages();
    this._articleservice.getTags()      
    .subscribe(
      data => {        
        this.tags = data;
        this._cdr.markForCheck();
      },
            error => console.error(error)
    );
  }

  onSubmit() {
    this.category.name = this.addCategoryForm.value.name;
    this.category.description = this.addCategoryForm.value.description;
    this.category.tags = this.addCategoryForm.value.tags;
    this.category.language = this.addCategoryForm.value.language.id;

    this.category.username = localStorage.getItem("token");

    this._articleservice.addcategory(this.category).subscribe(
      data => {
       this.apiresponse = data;
       
       if(this.apiresponse.message === 'CAT_EXIST') {
        this.responsemsg = "Category Already Exists.";
       } else if(this.apiresponse.message === 'success') {
           this.responsemsg = "Category Added.";
           this.addCategoryForm.reset();
          
           setTimeout(() => {
             this._router.navigate(['/auth/addcategory']);
          }, 3000);

       } else if(this.apiresponse.message === 'error') {
         console.log("Something went wrong. Contact Administrator");
         this.responsemsg = "Posting failed. Correct errors and Repost";
       } else {
         console.log("Iam lost while adding category.");
       }
       this._cdr.markForCheck();
     }
     
    );    
  
  }

}
