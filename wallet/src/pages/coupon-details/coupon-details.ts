import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BarcodePage } from '../protypes/barcodePage';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'coupon-details',
  templateUrl: 'coupon-details.html',
})
export class CouponDetailsPage extends BarcodePage{
  
  coupon:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
      private alertCtrl:AlertController,
      socialSharing:SocialSharing, private platform:Platform,
      private firebase:FirebaseProvider
    ) {
        super(socialSharing);

    this.coupon = navParams.get('coupon');
  }

  getMessage(){
    return "Gift card valued " +this.coupon.amount+" "+this.coupon.tokenType+". Reclaim at Dirsh Platform (https://www.dirsh.com).";
  }

  getTopic(){
    return 'Gift Card';
  }
}
