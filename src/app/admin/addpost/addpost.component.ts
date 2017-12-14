import { Component, OnInit, ViewChild, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Article } from '../../domain/article.interface';
import { NgForm } from '@angular/forms';
import { Language } from '../../domain/language.interface';
import { Router } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { environment } from '../../../environments/environment';
import { LanguageService } from '../../service/language.service';

declare let $ : any;
declare var tinymce: any;
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class AddpostComponent implements OnInit {

  apiresponse: any;

  @ViewChild('f') addArticleForm: NgForm;
  
  @Output() onEditorKeyup = new EventEmitter<any>();
  
  public article: Article = {};
  issueid="0";
  selectedmagazine: any = "";
  selectedlanguage: any = "";
  
  public languages: Language[];

  selectedtags:any;
  selectedcategorys:any;

 //public tags: any;
  categories: Array<any>;
  magazines: Array<any>;

  selectedValue: any = "";

  // tagarray: any;
  public tags : String[] = [];

  editor;
  selectedbodyvalue: any;
  responsemsg;
  imagebaseurl = environment.imagebaseurl;



  constructor(private _articleservice: ArticleService, 
    private _languageService: LanguageService, private _router: Router,
    private _cdr: ChangeDetectorRef
    
  ) { }

  ngOnInit() {
    this.languages =  this._languageService.getLanguages();

    this._articleservice.getMags()      
    .subscribe(
      data => {        
        this.magazines = data;
        this._cdr.markForCheck();
      },
            error => console.error(error)
    );

    // this._articleservice.getCategories()      
    // .subscribe(
    //   data => {        
    //     this.categories = data;
    //     this._cdr.markForCheck();
    //   },
    //         error => console.error(error)
    // );


    // this._articleservice.getTags()      
    // .subscribe(
    //   data => {        
    //     this.tags = data;
    //     this._cdr.markForCheck();
    //   },
    //         error => console.error(error)
    // );

    // this.article = 
    //   {
    //     id:'',
    //     title: '',
    //     rtitle: '',
    //     body: '',
    //     coverimg: '',
    //     language: '',
    //     description: '',
    //     tag: this.tags,
    //     category: this.categories,
    //     h2:'',
    //     readtime:'',        
    //     username:'',
    //     magname:'',
    //     issueid:'0'
    //   }

  
    
  }

  ngAfterViewInit() {
    
    
    
          tinymce.init({
            selector: '#add-editor',
            height: 500,
            plugins: ['link', 'paste', 'table','image', 'code', 'preview', 'media', 'lists'],
            image_prepend_url: this.imagebaseurl,        
            image_caption: true,
            skin_url: this.imagebaseurl + '/assets/skins/lightgray',
            relative_urls : false,
            remove_script_host : false,
            convert_urls : true,
            image_dimensions: true,
            setup: editor => {
              this.editor = editor;
              editor.on('init', () =>
              {
                  
                      editor.setContent('');
                  
              });
              editor.on('keyup', () => {
                const content = editor.getContent();
                this.selectedbodyvalue = content;
              //  this.article.body = content;
                //editor.this.onEditorKeyup.emit(content);
              });
            },
            content_css: [
              '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
              '//www.tinymce.com/css/codepen.min.css'
            ]
          });
          this._cdr.markForCheck();
        }

        public onChange(event): void {  // event will give you full breif of action
          event.preventDefault(); 
          const language = event.target.value;
          console.log(language);

          this._articleservice.getAllCategoriesByLanguage(language)      
          .subscribe(
            data => {        
             
              this.categories = data;
             
              this._cdr.markForCheck();
            },
                  error => console.error(error)
          );

          

        }

        public onChangeCat(event): void {  // event will give you full breif of action
          event.preventDefault(); 
       
          this.tags = this.selectedValue.tags.split(',');;
          this._cdr.markForCheck();

        }

        onSubmit() {
          
              this.article.title = this.addArticleForm.value.title;
              this.article.rtitle = this.addArticleForm.value.rtitle;
              this.article.language = this.addArticleForm.value.language;
              this.article.description = this.addArticleForm.value.description;
              
              this.article.tag = this.selectedtags;
            //  this.article.category = this.selectedcategorys;
              this.article.category = this.addArticleForm.value.category.id; 
              
              this.article.readtime = this.addArticleForm.value.readtime;
              this.article.h2 = this.addArticleForm.value.h2;
              this.article.magname = this.addArticleForm.value.magazine;
              this.article.issueid = this.addArticleForm.value.issueid;
              // this.article.creativetitle = this.addArticleForm.value.creativetitle;

              console.log('cat id'+ this.article.category);
        
              this.article.username = localStorage.getItem("token");
      
              this.article.body = this.selectedbodyvalue;
      
              console.log("VAL::" + this.article.username);
      
              this._articleservice.addarticle(this.article).subscribe(
                 data => {
                  this.apiresponse = data;

                  if(this.apiresponse.message === 'success') {
                      this.responsemsg = "Article Posted for Review";
                      this.addArticleForm.reset();
                      this.selectedmagazine = "";
                      this.selectedValue="";
                      this.selectedlanguage ="";
                      this.tags = [];
                      this.editor.setContent('');
      
                      // var tinymce_editor_id = 'my_tinymce_id'; 
                      // tinymce.get(tinymce_editor_id).setContent('');
      
                      setTimeout(() => {
                        this._router.navigate(['/auth/addpost']);
                     }, 3000);

                  } else if(this.apiresponse.message === 'error') {
                    console.log("Something went wrong. Contact Administrator");
                    this.responsemsg = "Posting failed. Correct errors and Repost";
                  } else {
                    console.log("Iam lost while adding article.");
                  }
                  this._cdr.markForCheck();
                }
                
               );    
            }

}
