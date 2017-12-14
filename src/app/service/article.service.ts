import { Injectable } from '@angular/core';

import { HttpHeaders, HttpRequest, HttpResponse, HttpClient, HttpInterceptor, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable'
import { environment } from '../../environments/environment';
import { Article } from '../domain/article.interface';
import { RequestOptions } from '@angular/http';
import { Category } from '../domain/category.interface';
import { Tag } from '../domain/tag.interface';


@Injectable()
export class ArticleService {
    backendUrl = environment.backendUrl;
    public profile: any;


    constructor(private _httpClient: HttpClient) {}

    addarticle(article: any) {
        return this._httpClient.post(this.backendUrl + '/api/article/add/', article);
    
}
addcategory(category: any) {
    return this._httpClient.post(this.backendUrl + '/api/category/add/', category);

}

addtag(tag: any) {
    return this._httpClient.post(this.backendUrl + '/api/tag/add/', tag);

}

getCategoryById(id: string) {
    return this._httpClient.get<Category>(this.backendUrl + '/api/categoryid/'+id);
}

getCategoryByName(name: string) {
    return this._httpClient.get<Category>(this.backendUrl + '/api/categoryname/'+name);
}

getTagById(id: string) {
    return this._httpClient.get<Tag>(this.backendUrl + '/api/tagid/'+id);
}

editcategory(category: any) {
    return this._httpClient.post(this.backendUrl + '/api/category/update/', category);
}

edittag(tag: any) {
    return this._httpClient.post(this.backendUrl + '/api/tag/update/', tag);
}

approvearticle(articleid: string) {
    return this._httpClient.post(this.backendUrl + '/api/article/approve/', articleid);
}


savearticle(article: any) {
    return this._httpClient.post(this.backendUrl + '/api/article/update/', article);
}

getArticlesByUsername(username: string) {
    const baseurl = this.backendUrl + "/api/articles/username/";
    return this._httpClient.get(baseurl + username );
}

getArticlesByMagazine(magname: string) {
    const baseurl = this.backendUrl + "/api/articles/magname/";

    return this._httpClient.get<Article[]>(baseurl + magname );
    
}

getArticlesByMagazineIssueId(magname: string, issueid: string) {
    const baseurl = this.backendUrl + "/api/articles/magname/";

     var hour = new Date().getHours();

    return this._httpClient.get<Article[]>(baseurl + magname +"/" + issueid);
    
}

getCategories() {
    const baseurl = this.backendUrl + "/api/getcategories";
console.log('inside getcat ' + baseurl);
    return this._httpClient.get<any>(baseurl);
    
}

getTags() {
    const baseurl = this.backendUrl + "/api/gettags";
    return this._httpClient.get(<any>baseurl);
}

getAllTags() {
    const baseurl = this.backendUrl + "/api/tags/list/";

    return this._httpClient.get<Tag[]>(baseurl);
    
}

getMags() {
    const baseurl = this.backendUrl + "/api/articles/getmags";
console.log('inside getmags ' + baseurl);
    return this._httpClient.get<any>(baseurl);
  
}

getArticlebyid(id: string) {
    return this._httpClient.get<Article>(this.backendUrl + '/api/articlebyid/'+id);
}

addcategorypic(id: string, formData, headers: HttpHeaders) {
    const params = new HttpParams().set('categoryid', id);
   console.log('222222');
  //const headers = new HttpHeaders().set('Accept', 'text/plain');

 // return this.http.get('/renderBannerTxt', {responseType: 'text', headers, params});

    return this._httpClient.post(this.backendUrl + '/api/categorypicsupload', formData , { headers, params}  );

}

addcoverimage(id: string, formData, headers: HttpHeaders) {
    const params = new HttpParams().set('articleid', id);
   
  //const headers = new HttpHeaders().set('Accept', 'text/plain');

 // return this.http.get('/renderBannerTxt', {responseType: 'text', headers, params});

    return this._httpClient.post(this.backendUrl + '/api/articlecoverpictures', formData , { headers, params}  );

}

addarticleimage(id: string, formData, headers: HttpHeaders) {
    const params = new HttpParams().set('articleid', id);
   
  //const headers = new HttpHeaders().set('Accept', 'text/plain');

 // return this.http.get('/renderBannerTxt', {responseType: 'text', headers, params});

    return this._httpClient.post(this.backendUrl + '/api/articlepictures', formData , { headers, params}  );

}

getFilesInFolder(articledirectory: string, formData, headers: HttpHeaders) {
    console.log('asdfasdf'+articledirectory.replace(/\//g,'~'));
    const params = new HttpParams().set('articledirectory', articledirectory.replace(/\//g,'~'));
   
  //const headers = new HttpHeaders().set('Accept', 'text/plain');

 // return this.http.get('/renderBannerTxt', {responseType: 'text', headers, params});

   // return this._httpClient.get(this.backendUrl + '/api/articles/getFilesInFolder', formData , { headers, params}  );
    return this._httpClient.get(this.backendUrl + '/api/articles/getFilesInFolder/'+ articledirectory.replace(/\//g,'~') );

}


getAllCategories() {
    const baseurl = this.backendUrl + "/api/categories/list/";

    return this._httpClient.get<Category[]>(baseurl);
    
}


getAllCategoriesByLimt(limit: string) {
    const baseurl = this.backendUrl + "/api/getcategoriesbylimit/";

    return this._httpClient.get<Category[]>(baseurl + limit);
    
}

getAllCategoriesByLanguage(language: string) {
    
    const baseurl = this.backendUrl + "/api/category/language/";
    console.log('kkk'+baseurl + language);

    return this._httpClient.get<Category[]>(baseurl + language);
    
}

getAllCategoriesByLangLimt(language: string, limit: string) {
    const baseurl = this.backendUrl + "/api/getcategoriesbylanglimit/";

    return this._httpClient.get<Category[]>(baseurl + language +"/"+ limit);
    
}

getArticlesByCategories(language: string, category: string, magname: string) {
    const baseurl = this.backendUrl + "/api/category/";
    return this._httpClient.get<Category[]>(baseurl + language + "/" + category + "/" + magname);
}

getArticlesByCategoriesLanguage(language: string, category: string) {
    const baseurl = this.backendUrl + "/api/category/";
    return this._httpClient.get<Category[]>(baseurl + language + "/" + category );
}

}  