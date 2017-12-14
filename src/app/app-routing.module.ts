import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


import { PagenotfoundComponent } from './common/pagenotfound/pagenotfound.component';

import { AboutUsComponent } from './common/terms-privacy/about-us/about-us.component';
import { PrivacyComponent } from './common/terms-privacy/privacy/privacy.component';
import { TermsComponent } from './common/terms-privacy/terms/terms.component';
import { ExploreComponent } from './promo/explore/explore.component';
import { HomeComponent } from './clients/home/home.component';
import { TopicComponent } from './common/topic/topic.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent }, 

    {  path: 'terms', component: TermsComponent },
    {  path: 'privacy', component: PrivacyComponent },
    {  path: 'about-us', component: AboutUsComponent },

    {  path: 'explore/:language', component: ExploreComponent },  
    {  path: 'topic/:language/:categoryname', component: TopicComponent },  

    {  path: 'auth', loadChildren: './auth.module#AuthModule' },  
    {  path: 'magazine', loadChildren: './clients.module#ClientsModule' },  

    { path: 'not-found', component: PagenotfoundComponent },
    { path: '**', redirectTo: '/not-found'}
  ]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    preloadingStrategy: PreloadAllModules // <-This is our preloading
  })],
  exports: [RouterModule]
  
})    

export class AppRoutingModule {

}