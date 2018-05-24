import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {LoaderProvider} from '../../providers/loader/loader';
import {StorageProvider} from '../../providers/storage/storage';

@IonicPage()
@Component({selector: 'page-create-coupon', templateUrl: 'create-coupon.html'})
export class CreateCouponPage {

  constructor(public navCtrl : NavController, public navParams : NavParams, private firebase : FirebaseProvider, private loader : LoaderProvider, private alertCtrl : AlertController, private storage : StorageProvider) {}

  insufficientBalance : boolean = true;
  tokens = [];
  balances = {};

  token : any;
  previouslyUsedTokenType : string;
  previouslyUsedTokenHasBalance:boolean=false;
  amount : number = 10;

  setAmount(amount:number){
    this.amount=amount;
  }

  ionViewDidLoad() {
    let that = this;
    this
      .storage
      .getCouponTokenType()
      .then((tokenType) => {
        that.previouslyUsedTokenType = tokenType;
        this
          .loader
          .load(() => {
            that
              .firebase
              .getBalancesRef()
              .once('value', function (snapshot) {
                that
                  .loader
                  .dismiss();
                if (snapshot.exists()) {
                  snapshot
                    .forEach(function (childSnapshot) {
                      var tokenType = childSnapshot.key;
                      var amount = that
                        .firebase
                        .roundDown(childSnapshot.val());
                      // do not add less than minimumAmountToSend to the list
                      if (tokenType === that.firebase.defaultTokenName()
                        ? (amount => 1.5)
                        : (amount => 1)) {
                        that
                          .tokens
                          .push({tokenType: tokenType, amount: amount});
                        that.balances[tokenType] = amount;
                        if(tokenType==that.previouslyUsedTokenType){
                          that.previouslyUsedTokenHasBalance=true;
                        }
                      }
                      return false;
                    });
                  that.token=that.previouslyUsedTokenHasBalance?
                    that.previouslyUsedTokenType
                    :
                    that.tokens[0].tokenType;
                  that
                    .tokens
                    .forEach((token) => {
                      if (token.tokenType == that.firebase.defaultTokenName()) {
                        let requiredDirsh = 1.5;
                        if (that.tokens.length > 1) {
                          requiredDirsh = 0.5;
                        }
                        if (token.amount >= requiredDirsh) {
                          that.insufficientBalance = false;
                        }
                        return true;
                      } else {
                        return false;
                      }
                    });
                }
              });
          });
      });

    this
      .storage
      .getCouponAmount()
      .then((amount) => {
        that.amount = amount;
      });
  }

  createCoupon() {
    let that = this;
    this
      .alertCtrl
      .create({
        title: 'Create Gift Card?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          }, {
            text: 'OK',
            handler: () => {
              that
                .storage
                .setCouponAmount(that.amount);
              that.storage.setCouponTokenType(that.token);
              that
                .loader
                .load(() => {
                  let id=that.firebase.generateCouponID();
                  that
                    .firebase
                    .createCoupon(that.token, that.amount, id)
                    .then((response) => {
                      let title;
                      if (response) {
                        that
                        .alertCtrl
                        .create({
                          title: 'Created Gift Card Successfully.',
                          buttons: [
                            {
                              text: 'OK',
                              role: 'cancel',
                              handler: data => {
                                that
                                  .navCtrl
                                  .push('CouponDetailsPage', {coupon: 
                                    {
                                      amount:that.amount,
                                      tokenType:that.token,
                                      key:id
                                    }
                                  });
                              }
                            }
                          ]
                        })
                        .present();
                      } else {
                        that
                        .alertCtrl
                        .create({
                          title: 'Creating Gift Card Failed.',
                          buttons: [
                            {
                              text: 'OK',
                              role: 'cancel',
                              handler: data => {
                                that
                                  .navCtrl
                                  .pop();
                              }
                            }
                          ]
                        })
                        .present();
                      }
                      that
                        .loader
                        .dismiss();
                      
                    });
                });
            }
          }
        ]
      })
      .present();
  }

  wholeBalance() {
    this.amount = this.firebase.roundDown(this.balances[this.token] - ((this.firebase.defaultTokenName() === this.token)
      ? this.firebase.transactionFee
      : 0));
  }
}