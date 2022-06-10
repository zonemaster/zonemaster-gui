import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { DomainComponent } from './components/domain/domain.component';
import { DomainCheckComponent } from './components/domain-check/domain-check.component';
import { FaqComponent } from './components/faq/faq.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { ResultComponent } from './components/result/result.component';
import { HistoryComponent } from './components/history/history.component';
import { AlertComponent } from './components/alert/alert.component';

import { FilterPipe } from './pipes/filter.pipe';
import { FilterByCategoriesPipe } from './pipes/filter-by-categories.pipe';
import { RomanizePipe } from './pipes/romanize.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import { AppService } from './services/app.service';
import { DnsCheckService } from './services/dns-check.service';
import { AlertService } from './services/alert.service';
import { NavigationService } from './services/navigation.service';
import { HeaderComponent } from './components/header/header.component';

import { HttpRequestInterceptor } from './interceptors/request.interceptor';
import { HttpMockRequestInterceptor } from './interceptors/mock.interceptor';

export const isMock = environment.mock;

// AoT requires an exported function for factories
export function TranslationLoaderFactory() {
  return new MyTranslationLoader();
}

class MyTranslationLoader extends TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(/* webpackChunkName: "i18n-[request]" */ `../assets/i18n/${lang}.json`));
  }
}

const appRoutes: Routes = [
  { path: 'domain_check', component: DomainComponent },
  { path: 'result/:resultID', component: ResultComponent },
  { path: 'test/:resultID', component: ResultComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'faq', component: FaqComponent },
  { path: '',
    redirectTo: 'domain_check',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DomainComponent,
    DomainCheckComponent,
    FaqComponent,
    PageNotFoundComponent,
    NavigationComponent,
    FooterComponent,
    FormComponent,
    FilterPipe,
    FilterByCategoriesPipe,
    RomanizePipe,
    SafeHtmlPipe,
    ResultComponent,
    HistoryComponent,
    AlertComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslationLoaderFactory,
      }
    }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, relativeLinkResolution: 'legacy' } // <-- debugging purposes only
    )
  ],
  providers: [
    AppService,
    DnsCheckService,
    AlertService,
    NavigationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: isMock ? HttpMockRequestInterceptor : HttpRequestInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (appService: AppService) => {
        return () => appService.loadConfig()
      },
      multi: true,
      deps: [AppService]
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
