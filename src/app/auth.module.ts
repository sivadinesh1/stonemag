import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { SkandagurublogComponent } from './clients/skandaguru/skandagurublog/skandagurublog.component';
import { SkandaguruhomeComponent } from './clients/skandaguru/skandaguruhome/skandaguruhome.component';
import { SkandagurulatestComponent } from './clients/skandaguru/skandagurulatest/skandagurulatest.component';
import { AddpostComponent } from './admin/addpost/addpost.component';
import { EditpostComponent } from './admin/editpost/editpost.component';
import { ForgotPassComponent } from './auth/forgot-pass/forgot-pass.component';
import { AddcategoryComponent } from './admin/category/addcategory/addcategory.component';
import { EditcategoryComponent } from './admin/category/editcategory/editcategory.component';
import { SearchpostComponent } from './admin/searchpost/searchpost.component';
import { SearchcategoryComponent } from './admin/category/searchcategory/searchcategory.component';
import { PreviewComponent } from './admin/preview/preview.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ListpostComponent } from './admin/listpost/listpost.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ImageUploadModule } from 'angular2-image-upload';
import { FormsModule } from '@angular/forms';
import { StickyFooterComponent } from './common/sticky-footer/sticky-footer.component';
import { SharedModule } from './shared.module';
import { AddtagComponent } from './admin/tag/addtag/addtag.component';
import { EdittagComponent } from './admin/tag/edittag/edittag.component';
import { SearchtagComponent } from './admin/tag/searchtag/searchtag.component';
const routes: Routes = [
   
  {  path: 'addpost', component: AddpostComponent },
  {  path: 'listpost', component: ListpostComponent },
  {  path: 'editpost/:articleid', component: EditpostComponent },
  {  path: 'search/:magname', component: SearchpostComponent },
  {  path: 'preview/:title', component: PreviewComponent },
  {  path: 'listcategory', component: SearchcategoryComponent },
  {  path: 'addcategory', component: AddcategoryComponent },
  {  path: 'editcategory/:categoryid', component: EditcategoryComponent },

  {  path: 'addtag', component: AddtagComponent },
  {  path: 'listtag', component: SearchtagComponent },
  {  path: 'edittag/:tagid', component: EdittagComponent },

  {  path: 'sign-up', component: SignUpComponent },
  {  path: 'sign-in', component: SignInComponent },
  {  path: 'forgot-pass', component: ForgotPassComponent },
  
];


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatButtonModule,
    ImageUploadModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    AddpostComponent,
    EditpostComponent,
    ForgotPassComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    SearchcategoryComponent,
    SearchpostComponent,
    PreviewComponent,
    SignInComponent,
    ListpostComponent,
    SignUpComponent,

    StickyFooterComponent,

    AddtagComponent,

    EdittagComponent,

    SearchtagComponent,

  ]
})
export class AuthModule { }



