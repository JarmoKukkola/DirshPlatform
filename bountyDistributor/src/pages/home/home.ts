import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import {FirebaseProvider} from '../../providers/firebase/firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ui : any;

  constructor(public navCtrl : NavController, 
    public firebaseProvider : FirebaseProvider) {
      if(firebase.auth().currentUser){
        this.goToTabsPage();
      }
    }

    goToTabsPage(){
      this.navCtrl.setRoot('TabsPage');
    }

  ionViewDidLoad() {
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

  getUiConfig() {
    let that = this;
    return {
      callbacks: {
        signInSuccess: function () {
          that.goToTabsPage();
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
      ]
    };
  }
}
