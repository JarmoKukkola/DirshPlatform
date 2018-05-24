import { ViewChild, Component } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { LoaderProvider } from '../providers/loader/loader';
import { TranslateService } from '@ngx-translate/core';
import { ElectronProvider } from '../providers/electron/electron';

@Component({ templateUrl: 'app.html' })
export class MyApp {
  rootPage: any = LoginPage;
  @ViewChild(Nav) nav;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public loader: LoaderProvider,public firebaseProvider: FirebaseProvider,
     translate: TranslateService, private electronProvider:ElectronProvider,
      private alertCtrl:AlertController) {
    translate.setDefaultLang('en');
    var config = {
      apiKey: "AIzaSyABEJ-ijVEH-4YentCF1mWpYiovdAmzaGo",
      authDomain: "dirsh-d6d60.firebaseapp.com",
      databaseURL: "https://dirsh-d6d60.firebaseio.com",
      projectId: "dirsh-d6d60"
    };
    firebase.initializeApp(config);
    platform
      .ready()
      .then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
      });
  }

  createToken() {
    this.nav.push('GenerateTokenPage');
  }

  coupons() {
    this.nav.push('CouponMainPage');
  }

  apiKey() {
    this.nav.push('ApikeyPage');
  }

  deleteAccount(){
    let that=this;
    this.alertCtrl.create({
      title: 'Delete Account?',
      message: 'WARNING: You cannot access your tokens or account history anymore.',
      buttons: [
        {
          text: 'Cancel',
          role:'cancel'
        },
        {
          text: 'Ok',
          handler: data => {
            that.firebaseProvider.deleteAccount().then((success:boolean)=>{
              let title,message;
              if(success){
                // deleting user successful
                title='Account Deleted Successfully'
              }else{
                // deleting user failed
                title='Deleting Account Failed';
                message='Login and Try Again'
              }
              this.alertCtrl.create({
                title: title,
                message: message,
                buttons: [
                  {
                    text: 'Ok',
                    handler:()=>{
                      that.logout();
                    }
                  }
                ]
              }).present();
            });
          }
        }
      ]
    }).present();
  }

  isApp() {
    return this
      .firebaseProvider.isApp();
  }

  feedback() {
    window.open('http://www.dirsh.com/contact', '_system');
  }

  statistics() {
    this.nav.push('StatsPage');
  }

  goToWebsite() {
    window.open('http://www.dirsh.com', '_system');
  }

  logout() {
    let that=this;
    this.firebaseProvider.isLoggedIn = false;
    // if (!this.isApp()&&this.firebaseProvider.isGoogleLoggedIn()) {
    // window.open("https://www.google.com/accounts/Logout?continue=https://www.dirsh.com", "_self")
    // } else {
    firebase
      .auth()
      .signOut()
      .then((result) => {
        that.electronProvider.clearStorage();
        that
          .nav
          .setRoot(LoginPage);
      }, (err) => {
        console.log(err);
      });
    // }
  }

  ngAfterViewInit() {
    firebase.auth().signOut();
  }
}
