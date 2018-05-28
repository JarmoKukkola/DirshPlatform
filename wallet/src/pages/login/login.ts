import { Component } from '@angular/core';
import { NavController, IonicPage, Platform, PopoverController } from 'ionic-angular';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ElectronProvider } from '../../providers/electron/electron';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';

@Component({ selector: 'page-login', templateUrl: 'login.html' })
export class LoginPage {

  ui: any;
  giftCardCode: string;
  isElectron:boolean=false;

  callback = () => {
    this.firebaseProvider.isLoggedIn = true;
    if (this.giftCardCode) {
      this.navCtrl.setRoot('OverviewPage', { giftCardCode: 'C:' + this.giftCardCode });
    } else {
      this.navCtrl.setRoot('OverviewPage')
    }
  }

  constructor(public navCtrl: NavController,
    public firebaseProvider: FirebaseProvider,
    public platform: Platform,
    private iab: InAppBrowser,
    private electronProvider: ElectronProvider, 
    private popoverCtrl:PopoverController
  ) {
    this.giftCardCode = platform.getQueryParam('C');
    this.isElectron=this.electronProvider.isElectron();
  }

  privacyPolicy:string;

  loginWithGoogle(){
    this.electronProvider.loginWithGoogle(this.callback);
  }

  ionViewDidLoad() {
    if (!this.isElectron) {
      this.ui = firebaseui
        .auth
        .AuthUI
        .getInstance();
      if (!this.ui) {
        this.ui = new firebaseui
          .auth
          .AuthUI(firebase.auth());
      }

      this
        .ui
        .start('#firebaseui-auth-container', this.getUiConfig());
      this
        .ui
        .disableAutoSignIn();
    }
  }

  getUiConfig() {
    let that=this;
    let uiConfig={
      callbacks: {
        signInSuccess: function () {
          that.callback();
          return false;
        }
      },
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          customParameters: {
            prompt: 'select_account'
          }
        }
      ],
      tosUrl: 'http://www.dirsh.com/terms-of-service'
    };
    if(this.isElectron){
      uiConfig['signInFlow']='popup';
    }
    return uiConfig;
  }
}
