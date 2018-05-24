import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import { TranslateService } from '@ngx-translate/core';
import {LoadingController} from 'ionic-angular';

@Injectable()
export class LoaderProvider {

  loading:any;

  constructor(
    // public http: Http,
    //  private translate : TranslateService,
     public loadingCtrl: LoadingController) {
  }

  dismiss(){
    if(this.loading!=null){
      this.loading.dismiss();
      this.loading=null;
    }
  }

  /*

  USAGE: 

  constructor add "private loader LoaderProvider"

  this.loader
      .load((dialog) => firebase.auth().signOut().then((result) => {
        dialog.dismiss();
        this
          .nav
          .setRoot('HomePage');
      }, (err) => {
        console.log(err);
      }));

  */

  load(callback){
    // this.translate.get('PLEASE_WAIT').subscribe(
      // value => {
        this.loading = this.loadingCtrl.create({
          content: 'Please Wait...'
        });
        this.loading.present();
        if(callback){
          callback(this.loading);
        }
      // }
    // )
  }
}
