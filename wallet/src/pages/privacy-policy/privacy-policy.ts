import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-privacy-policy',
  templateUrl: 'privacy-policy.html',
})
export class PrivacyPolicyPage {

  @ViewChild('scrollingContent') content: Content;

  accepted:boolean=false;

  constructor(public navCtrl: NavController, public platform:Platform) {
  }

  acceptPrivacyPolicy(){
    this.accepted=true;
    this.content.scrollToTop();
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  quit(){
    this.platform.exitApp();
  }
}
