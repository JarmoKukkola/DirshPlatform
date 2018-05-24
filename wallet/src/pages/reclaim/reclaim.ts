import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-reclaim',
  templateUrl: 'reclaim.html',
})
export class ReclaimPage {

  giftCardCode:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private barcodeScanner:BarcodeScanner,
     private alertCtrl:AlertController, 
    private platform:Platform, private firebase:FirebaseProvider) {
      let code=this.navParams.get('giftCardCode');
      if(code){
        console.log('code: '+code);
        this.setCode(code);
      }
  }

  scanBarcode(){
    let that = this;
    this
      .barcodeScanner
      .scan()
      .then((barcodeData) => {
        that.setCode(barcodeData.text);
      }, (err) => {
        that
            .alertCtrl
            .create({title: 'Scanning error', buttons: ['OK']})
            .present();
      });
    }

    setCode(text:string){
        let wrongFormat = true;
        let index = text.indexOf('C:');
        if (index == 0) {
          text = text.substring(2);
          this.giftCardCode = text.substring(0, text.length);
          wrongFormat=false;
          this.reclaim();
        }
        if (wrongFormat) {
          this
            .alertCtrl
            .create({title: 'Wrong format code', buttons: ['OK']})
            .present();
        }
  }

  reclaim(){
    let that=this;
    console.log('reclaim: '+this.giftCardCode);
    this.firebase.reclaimGiftCard(this.giftCardCode).then((responseArray)=>{
      console.log('returned to reclaim screen');
      let amount=responseArray[0];
      if(amount<0){
        that.alertCtrl.create({
          title:'Unsuccessful coupon reclaim.',
          buttons: [
            {
              text: 'OK',
              role: 'cancel'
            }
          ]
        }).present();
      }else{
        let tokenType=responseArray[1];
        that.alertCtrl.create({
          title:'Coupon reclaimed',
          message:amount+' '+tokenType,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                that.navCtrl.setRoot('OverviewPage');
              }
            }
          ]
        }).present();
      }
    });
  }
}
