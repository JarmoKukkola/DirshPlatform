import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-apikey',
  templateUrl: 'apikey.html',
})
export class ApikeyPage {

  constructor(public alertCtrl: AlertController, private firebase:FirebaseProvider) {
  }

  ionViewDidLoad(){
    let that=this;
    this.firebase.getApiKey().once('value').then(function(snapshot) {
      that.apikey=snapshot.val();
    });
  }

  apikey:string;

  create(){
    this.alertCtrl.create({
      title: 'Create API key?',
      message: 'It costs 0.5 Dirsh',
      buttons: [
        {
          text: 'Cancel',
          role:'cancel'
        },
        {
          text: 'Ok',
          handler: data => {
            this.apikey=this.firebase.randomString(30);
            this.firebase.setApiKey(this.apikey).then((success:boolean)=>{
              if(!success){
                this.apikey=null;
                this.alertCtrl.create({
                  title: 'Setting API key failed',
                  buttons: [
                    {
                      text: 'Ok',
                      role:'cancel'
                    }
                  ]
                }).present();
              }
            });
          }
        }
      ]
    }).present();
  }

  delete(){
    this.apikey=null;
    this.firebase.getApiKey().remove();
  }
}