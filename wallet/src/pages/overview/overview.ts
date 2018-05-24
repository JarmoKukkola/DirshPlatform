import {NgZone,ViewChild, Component} from '@angular/core';
import {
  Tabs,
  Events,
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from 'ionic-angular';
import {LoaderProvider} from '../../providers/loader/loader';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {StorageProvider} from '../../providers/storage/storage';

@IonicPage()
@Component({selector: 'page-overview', templateUrl: 'overview.html'})
export class OverviewPage {

  @ViewChild('overviewTabs')tabsRef : Tabs;

  tab1Root = 'BalancePage';
  tab2Root = 'ReceivedPage';
  tab3Root = 'SentPage';

  constructor(private events : Events, private alertCtrl : AlertController, public navCtrl : NavController, public navParams : NavParams, private loader : LoaderProvider,
    private firebaseProvider : FirebaseProvider, storage : StorageProvider,private ngZone:NgZone) {
      let giftCardCode=this.navParams.get('giftCardCode');
      if(giftCardCode){
        this.navCtrl.push('ReclaimPage',{giftCardCode:giftCardCode});
      }
    }

  receive() {
    this
      .navCtrl
      .push('ReceivePage', {
        callback: ()=> {
          this.reloadTabs();
        }
      });
  }

  selectedTabIndex = 0;

  reloadTabs(index : number = null) {
    this
      .loader
      .load(null);
    if (index) {
      this.selectedTabIndex = index;
    }
    let that = this;
    this
      .reloadPendingReceived()
      .then((resolve) => {
        this.ngZone.run(()=>{
        this
          .events
          .publish('reload-tabs', that.selectedTabIndex);
        });
        that
          .loader
          .dismiss();
      });
  }

  reloadPendingReceived() : Promise < boolean > {
    let that = this;
    return new Promise((resolve) => {
      this
        .firebaseProvider
        .getPendingReceivedRef()
        .once('value', function (pendingSnapshot) {
          if (pendingSnapshot.val() != null) {
            that
              .firebaseProvider
              .getBalancesRef()
              .once('value', function (balanceSnapshot) {
                let balanceData = {};
                balanceSnapshot.forEach(function (childSnapshot) {
                  let key = childSnapshot.key;
                  let value = childSnapshot.val();
                  balanceData[key] = value;
                  return false;
                });
                pendingSnapshot.forEach(function (childSnapshot) {
                  let key = childSnapshot.key;
                  let tokenType = childSnapshot
                    .child('tokenType')
                    .val();
                  let amount = childSnapshot
                    .child('amount')
                    .val();
                  let timeStamp = childSnapshot
                    .child('time')
                    .val();
                  let senderAddress = childSnapshot
                    .child('senderAddress')
                    .val();
                  let message = childSnapshot
                    .child('message')
                    .val();
                  let newBalance = balanceData[tokenType];
                  if (!newBalance) {
                    newBalance = 0;
                  }
                  newBalance += amount;
                  balanceData[tokenType] = newBalance;
                  that
                    .firebaseProvider
                    .receivePayment(key, tokenType, amount, timeStamp, senderAddress, message, newBalance);
                  return false;
                });
                resolve(true);
              });
          } else {
            resolve(true);
          }
        });
    });
  }

  send() {
    this
      .navCtrl
      .push('SendPage', {
        callback: () => {
          this.reloadTabs();
        }
      });
  }
}
