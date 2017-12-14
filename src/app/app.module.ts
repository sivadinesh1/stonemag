import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//common
 import { PagenotfoundComponent } from './common/pagenotfound/pagenotfound.component';

 import { MenubarComponent } from './common/menubar/menubar.component';
 import { FormsModule } from '@angular/forms';

//service
import { ArticleService } from './service/article.service';
import { LanguageService } from './service/language.service';

import { AuthService } from './auth/auth.service';
import { ExploreComponent } from './promo/explore/explore.component';

import { HomeComponent } from './clients/home/home.component';

import { SharedModule } from './shared.module';
import { TopicComponent } from './common/topic/topic.component';



@NgModule({
  declarations: [
    AppComponent,
    
    MenubarComponent,
    PagenotfoundComponent,
    ExploreComponent,
    HomeComponent,
    TopicComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgProgressModule,
    
    SharedModule.forRoot(),
    
    AppRoutingModule
  ],
  providers: [Title, ArticleService, LanguageService, AuthService, { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
