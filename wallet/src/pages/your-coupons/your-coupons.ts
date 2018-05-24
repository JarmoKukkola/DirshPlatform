import {Component, NgZone, ChangeDetectorRef} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ListPrototype} from '../protypes/listPrototype';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import * as firebase from 'firebase';
import {LoaderProvider} from '../../providers/loader/loader';

@IonicPage()
@Component({selector: 'page-your-coupons', templateUrl: 'your-coupons.html'})
export class YourCouponsPage extends ListPrototype {

  items = [];

  constructor(public navCtrl : NavController, public navParams : NavParams, firebaseProvider : FirebaseProvider, ngZone : NgZone, private changeDetector : ChangeDetectorRef, private loader : LoaderProvider) {
    super(firebaseProvider, ngZone);
  }

  protected getRef() : firebase.database.Reference {
    return this
      .firebaseProvider
      .getUsersCouponsRef();
  }

  processData(snapshot : any, that : any, array : Array < any >) {
    this
      .changeDetector
      .markForCheck();
    snapshot.forEach(function (childSnapshot) {
      let val = childSnapshot.val();
      let struct = {
        key: childSnapshot.key,
        tokenType: val.tokenType,
        amount: val.amount
      };
      that
        .firebaseProvider
        .getCouponsRef()
        .child(struct.key)
        .once('value', function (snapshot) {
          if (snapshot.exists()) {
            array.push(struct);
            that
              .ngZone
              .run(() => {
                that.items = array;
              });
          } else {
            that
              .firebaseProvider
              .getUsersCouponsRef()
              .child(struct.key)
              .remove();
          }
        });
      return false;
    });
  }

  clicked(i) {
    this
      .navCtrl
      .push('CouponDetailsPage', {coupon: this.items[i]});
  }
}