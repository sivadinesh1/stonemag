import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { SkandagurublogComponent } from './clients/skandaguru/skandagurublog/skandagurublog.component';
import { SkandaguruhomeComponent } from './clients/skandaguru/skandaguruhome/skandaguruhome.component';
import { SkandagurulatestComponent } from './clients/skandaguru/skandagurulatest/skandagurulatest.component';
import { SharedModule } from './shared.module';
import { HeaderBlogComponent } from './util/header-blog/header-blog.component';
import { DigitalpengalblogComponent } from './clients/digitalpengal/digitalpengalblog/digitalpengalblog.component';
import { DigitalpengalhomeComponent } from './clients/digitalpengal/digitalpengalhome/digitalpengalhome.component';
import { DigitalpengallatestComponent } from './clients/digitalpengal/digitalpengallatest/digitalpengallatest.component';
import { LubhomeComponent } from './clients/lub/lubhome/lubhome.component';
import { LubblogComponent } from './clients/lub/lubblog/lubblog.component';
import { LublatestComponent } from './clients/lub/lublatest/lublatest.component';
import { Issue2Component } from './clients/lub/issues/issue2/issue2.component';
import { LoopArticlesComponent } from './util/loop-articles/loop-articles.component';
import { GetArticleComponent } from './util/get-article/get-article.component';
import { HeaderMagComponent } from './util/header-mag/header-mag.component';
import { DigitalpengalsectionComponent } from './clients/digitalpengal/digitalpengalsection/digitalpengalsection.component';
import { SkandagurusectionComponent } from './clients/skandaguru/skandagurusection/skandagurusection.component';
const routes: Routes = [
  {  path: 'lub', component: LubhomeComponent, children: [
    {  path:'', redirectTo: 'latest', pathMatch: 'full' },
    {  path: 'issue/2', component: Issue2Component },
    {  path: 'latest', component: LublatestComponent },
    {  path: 'post/:title', component: LubblogComponent },
  ] },
  
  {  path: 'skandaguru', component: SkandaguruhomeComponent, children: [
    // {  path:'', redirectTo: 'latest', pathMatch: 'full' },
    {  path:'', component: SkandagurulatestComponent },
    {  path: ':category', component: SkandagurusectionComponent },
    {  path: 'post/:title', component: SkandagurublogComponent },
    ] },

    {  path: 'digitalpengal', component: DigitalpengalhomeComponent, children: [
      // {  path:'', redirectTo: 'latest', pathMatch: 'full' },
       {  path:'', component: DigitalpengallatestComponent },
      {  path: ':category', component: DigitalpengalsectionComponent  },
      {  path: 'post/:title', component: DigitalpengalblogComponent },
    ] },
   
];


@NgModule({
  imports: [
    CommonModule,
   
    
    
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: 
  [
    SkandagurublogComponent,
    SkandaguruhomeComponent,
    SkandagurulatestComponent,

    DigitalpengalblogComponent,
    
    DigitalpengalhomeComponent,
    DigitalpengallatestComponent,

    LubhomeComponent,
    LubblogComponent,
    LublatestComponent,

    Issue2Component,

    HeaderBlogComponent,
    LoopArticlesComponent,
    
    GetArticleComponent,
    
    HeaderMagComponent,
    
    DigitalpengalsectionComponent,
    
    SkandagurusectionComponent,

    //todo
    // PageComponent,
    // PagelatestComponent,
    // PagehomeComponent,
    // PageblogComponent,

    
  ]
})
export class ClientsModule { }



