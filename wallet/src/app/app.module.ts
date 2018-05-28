import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HttpModule, Http } from '@angular/http';
import { LoginPage } from '../pages/login/login';
import { LoaderProvider } from '../providers/loader/loader';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { StorageProvider } from '../providers/storage/storage';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ElectronProvider } from '../providers/electron/electron';
import { PrivacyPolicyPageModule } from '../pages/privacy-policy/privacy-policy.module';

@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    PrivacyPolicyPageModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top',
      mode: 'md',
      platforms: {
        ios: {
          scrollAssist: false,
          autoFocusAssist: false
        },
        android: {
          scrollAssist: false,
          autoFocusAssist: false
        }
      }
    }),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    InAppBrowser,
    FirebaseProvider,
    LoaderProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    ElectronProvider
  ]
})
export class AppModule {}
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
