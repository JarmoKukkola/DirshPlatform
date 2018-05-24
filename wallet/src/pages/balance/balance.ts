import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import * as firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { TabPrototype } from '../protypes/tabProtype';
import { ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-balance',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'balance.html'
})
export class BalancePage extends TabPrototype{
  constructor(events: Events, navCtrl: NavController, navParams: NavParams,
    firebaseProvider:FirebaseProvider,
    ngZone:NgZone,
    private changeDetector : ChangeDetectorRef) {
    super(events,navCtrl,navParams,firebaseProvider,ngZone);
  }

  protected getRef(): firebase.database.Reference{
    return this.firebaseProvider.getBalancesRef();
  }

  processData(snapshot:any, that:any, array:Array<any>){
    this.changeDetector.markForCheck(); 
    snapshot.forEach(function(childSnapshot) {
      let val={key:childSnapshot.key,value:childSnapshot.val()};
      array.push(val);
      return false;
    });
  }
}
