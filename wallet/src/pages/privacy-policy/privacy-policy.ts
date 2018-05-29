import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ElectronProvider } from '../../providers/electron/electron';

@IonicPage()
@Component({
  selector: 'page-privacy-policy',
  templateUrl: 'privacy-policy.html',
})
export class PrivacyPolicyPage {

  @ViewChild('scrollingContent') content: Content;

  accepted:boolean=false;

  constructor(public navCtrl: NavController, public platform:Platform, private electron:ElectronProvider) {
  }

  acceptPrivacyPolicy(){
    this.accepted=true;
    this.content.scrollToTop();
  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  quit(){
    if(this.electron.isElectron()){
      this.electron.quit();
    }else{
      this.platform.exitApp();
    }
  }
}
