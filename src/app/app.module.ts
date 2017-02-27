import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { DataService } from './data.service';
import {  HighlightDirective } from './common.directive';
import { EqualValidator } from './equal-validator.directive';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BooleanPipe } from './boolean-pipe';
import { BasicPage } from '../pages/slides/basic/pages';
import { HelloPage } from '../pages/hello-ionic/hello-ionic';
import { MyPage } from '../pages/my-page/my-page';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    BooleanPipe,
    BasicPage,
    HelloPage,
    MyPage,
    HighlightDirective,
    EqualValidator
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  exports: [BooleanPipe,HighlightDirective,EqualValidator],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    HelloPage,
    MyPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},{provide:'data', useClass: DataService}]
})
export class AppModule {}
