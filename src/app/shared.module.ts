import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsPrivacyComponent } from './common/terms-privacy/terms-privacy.component';
import { TermsComponent } from './common/terms-privacy/terms/terms.component';
import { PrivacyComponent } from './common/terms-privacy/privacy/privacy.component';
import { AboutUsComponent } from './common/terms-privacy/about-us/about-us.component';
import { UrlidPipe } from './util/pipe/url-id.pipe';
import { SafePipe } from './util/pipe/safe-html.pipe';
import { EscapeHtmlPipe } from './util/pipe/keep-html.pipe';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { NgPipesModule } from 'ngx-pipes';
import { CommingsoonComponent } from './common/commingsoon/commingsoon.component';
import { TopicComponent } from './common/topic/topic.component';

@NgModule({
  imports: [
    CommonModule,
    NgPipesModule
  ],
  declarations: [
    TermsPrivacyComponent,
    TermsComponent,
    PrivacyComponent,
    AboutUsComponent,
    CommingsoonComponent,

    UrlidPipe,
    SafePipe,
    EscapeHtmlPipe,
    
    
  ],
  exports: [
    CommonModule,
    TermsPrivacyComponent,
    TermsComponent,
    PrivacyComponent,
    AboutUsComponent,
    CommingsoonComponent,
    
    EscapeHtmlPipe,
    UrlidPipe,
    SafePipe,
    NgPipesModule
  ],
  
})
export class SharedModule { 
  static forRoot() : ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UrlidPipe]
    }
  } 
}
