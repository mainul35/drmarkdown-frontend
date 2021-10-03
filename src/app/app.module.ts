import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MarkdownModule} from 'ngx-markdown';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {MydocsComponent} from './components/mydocs/mydocs.component';
import {DocCellComponent} from './components/doc-cell/doc-cell.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {DocComponent} from './components/doc/doc.component';
import {CustomHttpInterceptor} from './interceptors/http-interceptor';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {ErrorInterceptor} from './interceptors/error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MydocsComponent,
    DocCellComponent,
    RegisterComponent,
    DocComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
