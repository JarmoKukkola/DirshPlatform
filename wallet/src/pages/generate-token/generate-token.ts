import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import {LoaderProvider} from '../../providers/loader/loader';

@IonicPage()
@Component({selector: 'page-generate-token', templateUrl: 'generate-token.html'})
export class GenerateTokenPage {

  name : string = '';
  totalSupply : number = 100000000;
  minTotalSupply = 1000000;
  maxTotalSupply = 10000000000;
  pattern = /^[A-Za-z0-9]{3,20}$/;

  constructor(public navCtrl : NavController, public navParams : NavParams, private alertCtrl : AlertController, public firebase : FirebaseProvider, private loader : LoaderProvider) {}

  createCustomToken() {
    let failed = false;
    let message;
    this.totalSupply=Number(this.totalSupply);
    if (this.totalSupply < this.minTotalSupply) {
      failed = true;
      message = "Too Low Supply";
    }
    if (this.totalSupply > this.maxTotalSupply) {
      failed = true;
      message = "Too High Supply";
    }
    if (!this.pattern.test(this.name)) {
      failed = true;
      message = "Invalid Name";
    }
    if (failed) {
      this.showFailedAlert(message);
    } else {
      let that = this;
      this
        .alertCtrl
        .create({
          title: 'Create custom token?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            }, {
              text: 'OK',
              handler: () => {
                that
                  .loader
                  .load(() => {
                    this
                      .firebase
                      .createCustomToken(this.name, this.totalSupply, this.alertCtrl)
                      .then((response) => {
                        that
                          .loader
                          .dismiss();
                        that
                          .navCtrl
                          .pop();
                      });
                  });
              }
            }
          ]
        })
        .present();
    }
  }

  showFailedAlert(message : string) {
    this
      .alertCtrl
      .create({title: message, buttons: ['Dismiss']})
      .present();
  }
}
