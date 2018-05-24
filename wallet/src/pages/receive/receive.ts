import {Component} from '@angular/core';
import {
  NavParams,
  IonicPage,
  NavController,
  AlertController,  
  Platform
} from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {LoaderProvider} from '../../providers/loader/loader';
import {SocialSharing} from '@ionic-native/social-sharing';
import {StorageProvider} from '../../providers/storage/storage';
import { BarcodePage } from '../protypes/barcodePage';

@IonicPage()
@Component({selector: 'page-receive', templateUrl: 'receive.html'})
export class ReceivePage extends BarcodePage{

  amount : number;
  myAddress : string;
  tokenType : string;
  tokenTypes = [];
  message : string = "";

  elementType = 'string';
  value = 'R:' + this.myAddress + ',T:' + this.tokenType + ',A:' + this.amount + ',M:' + this.message;

  constructor(private navParams : NavParams, private navCtrl : NavController,
     alertCtrl : AlertController, private firebaseProvider : FirebaseProvider,
      loader : LoaderProvider, socialSharing : SocialSharing, storage : StorageProvider,
      private platform:Platform
    ) {
        super(socialSharing);
    this.myAddress = firebaseProvider.getUid();
  }

  ionViewDidLoad() {
    let that = this;
    this
      .firebaseProvider
      .getBalancesRef()
      .once('value', function (snapshot) {
        snapshot
          .forEach(function (childSnapshot) {
            that
              .tokenTypes
              .push(childSnapshot.key);
            return false;
          });
      });
  }

  callback : any;

  ionViewWillEnter() {
    this.callback = this
      .navParams
      .get("callback")
  }

  ionViewWillLeave() {
    this
    .callback();
  }

  onChange() {
    this.value = 'R:' + this.myAddress + ',T:';
    if (this.tokenType) {
      this.value += this.tokenType;
    }
    this.value += ',A:';
    if (this.amount) {
      this.value += this.amount;
    }
    this.value += ',M:' + this.message;
  }

  ionViewDidEnter() {
    this.onChange();
  }

  getMessage(){
    let message = "Payment was requested via Dirsh Platform (https://www.dirsh.com).\n\nReceiver ad" +
        "dress: " + this.myAddress;
    if (this.tokenType && this.tokenType.length > 0) {
      message += "\nToken Type: " + this.tokenType;
    }
    if (this.amount && this.amount > 0) {
      message += "\nAmount: " + this.amount;
    }
    if (this.message && this.message.length > 0) {
      message += "\nMessage: " + this.message;
    }
    return message;
  }

  getTopic(){
    return 'Payment Request';
  }

  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  generateMessage() { //generated random reference id for payment
    this.message = '';
    for (let i = 0; i < 10; i++) {
      this.message += this.characters[Math.floor(Math.random() * this.characters.length)];
    }
    this.onChange();
  }

}