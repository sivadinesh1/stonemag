import { Component, OnInit, ViewChild, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Article } from '../../domain/article.interface';
import { NgForm } from '@angular/forms';
import { Language } from '../../domain/language.interface';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { environment } from '../../../environments/environment';
import { LanguageService } from '../../service/language.service';
import { Subscription } from 'rxjs/Rx';
import { FileHolder } from 'angular2-image-upload/lib/image-upload/image-upload.component';
import { HttpHeaders, HttpEventType, HttpErrorResponse } from '@angular/common/http';

declare var tinymce: any;
@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditpostComponent implements OnInit {

  @Output() onEditorKeyup = new EventEmitter<any>();
  editor;  

  @ViewChild('f') editArticleForm: NgForm;
  urlpath: { articleid: string };
  paramsSubscription: Subscription;
  article: any;
  
  selectedLanguage: any;
  selectedtags:any;
  selectedcategorys:any;
  selectedbodyvalue: any;
  selectedMagazine: any;

  public languages: Language[];

  public tags: any;
  public categories: any;
  magazines: Array<any>;
  responsemsg;
  apiresponse: any;

  imagesMeta: any;

id: string;

  
  
  articleimageUrl = environment.backendUrl + "/api/articlepictures";
  
  imagebaseurl = environment.imagebaseurl;
  imgrepository = environment.imgrepository;

  constructor(private _articleservice: ArticleService,  private _router: Router, 
    private _route: ActivatedRoute, 
    private _languageService: LanguageService, private _cdr: ChangeDetectorRef
    
  ) { 

  }

  ngOnInit() {
    
        this.urlpath = { articleid: this._route.snapshot.params['articleid'] };
        
            this.paramsSubscription = this._route.params
              .subscribe(
              (params: Params) => {
                this.urlpath.articleid = params['articleid'];
              }
              );
        
            this._route.fragment.subscribe();
    
        this.languages =  this._languageService.getLanguages();
        //this.tags =  this._tagService.getTags();
    
        this._articleservice.getMags()      
        .subscribe(
          data => {        
            this.magazines = data;
            this._cdr.markForCheck();
          },
                error => console.error(error)
        );
    
    
      }


  imageRemoved(file: FileHolder) {
  }

  onUploadFinished(file: FileHolder) {
   // console.log(JSON.stringify(file.serverResponse));
  }

  uploadStateChange(state: boolean) {
  }

  onSubmit() {
    this.article.title = this.editArticleForm.value.title;
    this.article.rtitle = this.editArticleForm.value.rtitle;
    this.article.language = this.selectedLanguage;
    this.article.description = this.editArticleForm.value.description;

    this.article.category = this.editArticleForm.value.category;
    this.article.tag = this.editArticleForm.value.tags;

    // this.article.body = this.selectedbodyvalue.
    //   replace('&lt;iframe','<iframe').
    //   replace('&gt;&lt;/iframe>', '></iframe>').
    //   replace('&gt;&lt;/iframe&gt;', '></iframe>');

    this.article.body = this.selectedbodyvalue.
    replace(/\&lt;iframe/g,'<iframe').
     replace(/\&gt;&lt;\/iframe>/g, '></iframe>').
     replace(/\&gt;&lt;\/iframe&gt;/g, '></iframe>').
     replace(/<strong>/g, '<b>').
     replace(/<\/strong>/g, '</b>')

    console.log(this.article.body);
    this.article.h2 = this.editArticleForm.value.h2;

     this._articleservice.savearticle(this.article).subscribe(
       data => {
        this.apiresponse = data;
        if(this.apiresponse.message === 'success') {
          
          this.responsemsg = "Article Review Completed";
          
          this.editArticleForm.reset();
          this.editor.setContent('');

          console.log('vaueee'+ this.article.magname);

          setTimeout(() => {
            this._router.navigate(['/auth/search/'+this.article.magname]);
         }, 3000);

      } else if(this.apiresponse.message  === 'error') {
        console.log("Something went wrong. Contact Administrator");
        this.responsemsg = "Posting failed. Correct errors and Repost";
      } else {
        console.log("Iam lost while editing article.");
      }         
      this._cdr.markForCheck();  
       }          
     );      
  }

  ngAfterViewInit() {

     this._articleservice.getArticlebyid(this.urlpath.articleid)
       .subscribe(
       data => {
         this.article = data;
        
         this.selectedLanguage = this.article.language;
         this.selectedtags = this.article.tags;
         this.selectedbodyvalue = this.article.body;
         this.selectedMagazine = this.article.magname;
         this._cdr.markForCheck();
       },
       (data: any[]) => console.log(data)
       );

      //  console.log('KKKKKKKKK'+this.urlpath.articleid);
      //  console.log('KKKKKKKKKwwww'+this.imagebaseurl);

       let headers = new HttpHeaders();
       
        //headers = headers.set('Authorization', this.article.toString());
       
        
        const formData = new FormData();

       this._articleservice.getFilesInFolder(this.imgrepository + this.urlpath.articleid + "/images",formData, headers)
       .subscribe(
       data => {
        console.log(data);
        this.responsemsg = data;
        
        if(this.responsemsg.message !== 'Error fetching images for tinymce') {
          this.imagesMeta = data;
        }
        this._cdr.markForCheck();
       },
       (data: any[]) => console.log(data)
       );


// console.log('ABCD'+this.selectedbodyvalue);

setTimeout(()=>{
       tinymce.init({
         selector: '#edit-editor',
         height: 500,
        //  plugins: ['link', 'paste', 'table','image', 'code', 'preview', 'lists'],
         plugins: ["link paste table image code preview media lists"],
         image_prepend_url: this.imagebaseurl,        
         image_caption: true,
         skin_url: this.imagebaseurl + '/assets/skins/lightgray',
         relative_urls : false,
         remove_script_host : false,
         convert_urls : true,
         image_dimensions: true,
         image_list: this.imagesMeta,
       
         setup: editor => {
           this.editor = editor;
         
           editor.on('keyup', () => {
             //const content = editor.getContent();
             this.selectedbodyvalue = editor.getContent();
             //editor.this.onEditorKeyup.emit(content);
           });
         },

       });
       this._cdr.markForCheck();
      }, 800); 


       setTimeout(()=>{
         if(this.selectedbodyvalue) {
          this.editor.setContent(this.selectedbodyvalue);
         }
         this._cdr.markForCheck();
     }, 1000); 

     }

    keyupHandlerFunction(e):void{    
      this.selectedbodyvalue = e;
      this._cdr.markForCheck();
     
    }

    ngOnDestroy() {
      tinymce.remove(this.editor);
      this.paramsSubscription.unsubscribe();
    }

     myCustomInitInstance(inst) {
    //  alert("Editor: " + inst.editorId + " is now initialized.");
}

handleInputChange (event, item) {
  console.log('item.. '+ item);
  var image = event.target.files[0];

  var pattern = /image-*/;
  var reader = new FileReader();

  if (!image.type.match(pattern)) {
      console.error('File is not an image');
      //of course you can show an alert message here
      return;
  }
 
  if(item === 'cover') {
    this.addcoverimage(image); 
  } else if (item === 'article') {
    this.addarticleimage(image);
  }
  this._cdr.markForCheck();
}


addcoverimage(image) {
  let headers = new HttpHeaders();
  
   headers = headers.set('Authorization', this.article.toString());
  
   
   const formData = new FormData();
     formData.append("image", image);
 
     this._articleservice.addcoverimage(this.article.id, formData, headers)
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

addarticleimage(image) {
  let headers = new HttpHeaders();
  
   headers = headers.set('Authorization', this.article.toString());
  
   
   const formData = new FormData();
     formData.append("image", image);
 
     this._articleservice.addarticleimage(this.article.id, formData, headers)
     .subscribe(
     data => {
       this.responsemsg = data;
   
       if(this.responsemsg.message === 'success') {
         this.responsemsg = "Pictures for Article successfully uploaded.";
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
