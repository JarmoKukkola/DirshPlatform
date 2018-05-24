import { Component,NgZone } from '@angular/core';
import { Events,IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SentPage } from '../sent/sent';

@IonicPage()
@Component({
  selector: 'page-received',
  templateUrl: '../sent/sent.html',
})
export class ReceivedPage extends SentPage{

  constructor(events: Events,navCtrl: NavController, navParams: NavParams,
    firebaseProvider:FirebaseProvider,ngZone:NgZone) {
    super(events,navCtrl,navParams,firebaseProvider,ngZone);
  }     

  protected getRef(){
    return this.firebaseProvider.getReceivedRef().orderByChild('time');
  }

  protected getEmptyText():string{
    return 'No received payments';
  }

  getParticipant(item:any){
    return item.senderAddress;
  }

  protected getParticipantType():string{
    return 'Sender';    
  }
}
