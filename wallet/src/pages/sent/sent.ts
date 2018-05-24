import { Component,NgZone } from '@angular/core';
import { Events,IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { TabPrototype } from '../protypes/tabProtype';

@IonicPage()
@Component({
  selector: 'page-sent',
  templateUrl: 'sent.html',
})
export class SentPage extends TabPrototype{

  constructor(events: Events,public navCtrl: NavController, public navParams: NavParams,
    protected firebaseProvider:FirebaseProvider,ngZone:NgZone) {
    super(events,navCtrl,navParams,firebaseProvider,ngZone);
  }      
   
  protected getRef(){
    return this.firebaseProvider.getSentRef().orderByChild('time');
  }

  protected getEmptyText():string{
    return 'No sent payments';
  }

  protected getParticipantType():string{
    return 'Receiver';
  }

  getParticipant(item:any){
    return item.receiverAddress;
  }

  processData(snapshot:any, that:any,array:Array<any>){
    snapshot.forEach(function(childSnapshot) {
      array.unshift(childSnapshot.val()); //unshift instead of push to show newest item first
      return false;
    });
  }
}

