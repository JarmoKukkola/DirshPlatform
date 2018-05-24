import {NgZone} from '@angular/core';
import * as firebase from 'firebase';
import {FirebaseProvider} from '../../providers/firebase/firebase';

export abstract class ListPrototype {
  items = [];
  tabIndex : number;
  constructor(protected firebaseProvider : FirebaseProvider, protected ngZone : NgZone
  ) {    
  }

  ionViewDidEnter() {
    this.refreshData();
  }

  doRefresh(refresher) {
    this.refreshData(() => refresher.complete());
  }

  protected abstract getRef() : firebase.database.Query;

  abstract processData(data : any, that : any, array : Array < any >);

  refreshData(callback : any = null) {
    let that = this;

    this
      .getRef()
      .once('value', function (snapshot) {
        let array = [];
        that.processData(snapshot, that, array);
        that
          .ngZone
          .run(() => {
            that.items = array;
          });
        if (callback) {
          callback();
        }
      });
  }
}
