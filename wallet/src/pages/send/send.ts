import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, Platform, NavParams} from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {LoaderProvider} from '../../providers/loader/loader';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {ChangeDetectorRef} from '@angular/core';
import {StorageProvider} from '../../providers/storage/storage';


@IonicPage()
@Component({selector: 'page-send', templateUrl: 'send.html'})
export class SendPage {

  amount : any = 100;
  receiverAddress : string;
  token : string;
  transactionFeeText : string = '0.1';
  setTransactionFee(token:string) {
    let transferDefaultNot3rdPartyToken = (token == this.firebaseProvider.defaultTokenName());
    if (transferDefaultNot3rdPartyToken) {

      this.transactionFeeText = String(this.firebaseProvider.roundUp(this.firebaseProvider.transactionFee));
    } else {
      this.transactionFeeText = String(this.firebaseProvider.roundUp(5 * this.firebaseProvider.transactionFee));
    }
  }

  tokenTypeChanged(token:string) {
    this.setTransactionFee(token);
  }

  shareSendingAddress : boolean = true;

  message : string = "";

  tokenTypes = [];
  balances = {};

  sufficientDefaultToken = false;

  constructor(
    private barcodeScanner : BarcodeScanner, 
    public navCtrl : NavController,
     private navParams : NavParams, private alertCtrl : AlertController,
      protected firebaseProvider : FirebaseProvider, private loader : LoaderProvider,
       private storage : StorageProvider, private changeDetector : ChangeDetectorRef,
        private platform : Platform) {
    storage
      .getShouldShareSendingAddress()
      .then((shareSendingAddress) => {
        this.shareSendingAddress = shareSendingAddress;
      });
  }

  updateShareAddress() {
    this
      .storage
      .setShouldShareSendingAddress(!this.shareSendingAddress);
  }

  ionViewDidLoad() {
    let that = this;
    this
      .firebaseProvider
      .getBalancesRef()
      .once('value', function (snapshot) {
        snapshot
          .forEach(function (childSnapshot) {
            if (that.token != that.firebaseProvider.defaultTokenName()) {
              that.token = childSnapshot.key;
            }
            let currentTokenType = childSnapshot.key;
            that
              .tokenTypes
              .push(currentTokenType);
            that.balances[currentTokenType] = childSnapshot.val();
            if (currentTokenType === that.firebaseProvider.defaultTokenName()) {
              that.sufficientDefaultToken = that.balances[currentTokenType] > that.firebaseProvider.transactionFee;
            }
            return false;
          });
      });

    this
      .storage
      .getPreviousReceiverAddress()
      .then((address) => {
        that.receiverAddress = address;
      });
  }

  accountRegex = /^[0-9a-zA-Z]{27}[0-9]$/;

  send() {
    if (!this.amount || this.amount < 1){
      this
        .alertCtrl
        .create({
          title: '1 '+this.token+' is minimum amount to send',
          buttons: [
            {
              text: 'OK',
              role: 'cancel'
            }
          ]
        })
        .present();
    }
    else if(this.amount > this.balances[this.token]) {
      this
        .alertCtrl
        .create({
          title: 'Insufficient balance',
          buttons: [
            {
              text: 'OK',
              role: 'cancel'
            }
          ]
        })
        .present();
    } else if (!this.accountRegex.test(this.receiverAddress)) {
      this
        .alertCtrl
        .create({
          title: 'Incorrect Receiving Address',
          buttons: [
            {
              text: 'OK',
              role: 'cancel'
            }
          ]
        })
        .present();
    } else {
      this
        .alertCtrl
        .create({
          title: 'Confirm sending?',
          message: this.amount + " " + this.token + " to " + this.receiverAddress,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                let that = this;
                this
                  .storage
                  .setPreviousReceiverAddress(that.receiverAddress);
                this
                  .firebaseProvider
                  .send(this.token, Number(this.amount), this.balances, this.receiverAddress, this.message, this.shareSendingAddress)
                  .then((success) => {
                    that
                    .loader
                    .dismiss();
                    if(success){
                    that
                      .alertCtrl
                      .create({
                        title: 'Transaction successful',
                        buttons: [
                          {
                            text: 'OK',
                            handler: () => {
                              that
                                .navCtrl
                                .pop()
                                .then(() => {
                                  that
                                    .navParams
                                    .get('callback')('');
                                });
                            }
                          }
                        ]
                      })
                      .present();
                    }else{
                      that
                      .alertCtrl
                      .create({
                        title: 'Error sending tokens.',
                        buttons: [
                          {
                            text: 'OK',
                            handler: () => {
                              that
                                .navCtrl
                                .pop()
                                .then(() => {
                                  that
                                    .navParams
                                    .get('callback')('');
                                });
                            }
                          }
                        ]
                      })
                      .present();
                    }
                  });
              }
            }, {
              text: 'Cancel',
              role: 'cancel'
            }
          ]
        })
        .present();
    }
  }

  wholeBalance() {
    this.amount = this.firebaseProvider.roundDown(this.balances[this.token] - ((this.firebaseProvider.defaultTokenName() === this.token)
      ? this.firebaseProvider.transactionFee
      : 0));
  }

  scanBarcode() {
    let that = this;
    this
      .barcodeScanner
      .scan()
      .then((barcodeData) => {
        let wrongFormat = true;
        let text = barcodeData.text;
        let index = text.indexOf('R:');
        if (index == 0) {
          text = text.substring(2);
          index = text.indexOf(',T:');
          that.receiverAddress = text.substring(0, index);
          if (index >= 0) {
            text = text.substring(index + 3);
            index = text.indexOf(',A:');
            let tempTokenType = text.substring(0, index);
            if (tempTokenType && tempTokenType.length > 0) {
              that.token = tempTokenType;
            }
            if (index >= 0) {
              text = text.substring(index + 3);
              index = text.indexOf(',M:');
              if (index > 0) {
                that.amount = Number(text.substring(0, index));
              }
              wrongFormat = false;
              if (index >= 0) {
                that.message = text.substring(index + 3);
              }
            }
          }
        }
        if (wrongFormat) {
          that
            .alertCtrl
            .create({title: 'Wrong format code', buttons: ['OK']})
            .present();
        }
      }, (err) => {
        that
          .alertCtrl
          .create({title: 'Scanning error', buttons: ['OK']})
          .present();
      });
  }

  setAmount(amount:number){
    this.amount=amount;
  }
}