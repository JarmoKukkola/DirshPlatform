import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FirebaseProvider } from '../../providers/firebase/firebase';
// import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {

  items = {
    article:0, 
    community:0,
    openSource:0,
    youtube:0
  };

  type:string;
  address:string;
  amount:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private firebaseProvider:FirebaseProvider, private alertCtrl:AlertController) {
  }

  ionViewDidLoad(){
    // console.log(firebase.auth().currentUser.uid);//auth.uid of current user

    let that=this;
    this.firebaseProvider.getDistributionPublicRef().on('value', function(snapshot) {
      let val=snapshot.val();
      that.items.article=val.article;
      that.items.community=val.community;
      that.items.openSource=val.openSource;
      that.items.youtube=val.youtube;
    });
  }

  submit(){
    let balance=this.items[this.type];
    console.log('type: '+this.type);
    console.log('balance: '+balance);

    if(balance<this.amount){
      let alert = this.alertCtrl.create({
        title: 'Insufficient balance',
        buttons: ['OK']
      }).present();
    }else if(this.address.length!=28){
      let alert = this.alertCtrl.create({
        title: 'False address',
        buttons: ['OK']
      }).present();
    }else{
      this.alertCtrl.create({
        title: 'Send '+this.amount+' Dirsh?',
        message: 'From '+this.type+' pool to '+this.address,
        buttons: [
          {
            text: 'Cancel',
            role:'cancel'
          },
          {
            text: 'Ok',
            handler: data => {
              this.firebaseProvider.send(this.type,this.amount,this.items[this.type],this.address);
            }
          }
        ]
      }).present();
    }
  }

  logout(){
    window.open("https://www.google.com/accounts/Logout", "_self")
  }

  onPoolSelect(){
    switch(this.type){
      case 'youtube':
        this.amount=15000;
        break;
      case 'article':
        this.amount=15000;
        break;
      case 'openSource':
        this.amount=150;
        break;
      case 'community':
        this.amount=100;
        break;
    }
  }
}
