import {NgZone} from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';
import {FirebaseProvider} from '../../providers/firebase/firebase';
import { ListPrototype } from './listPrototype';

export abstract class TabPrototype extends ListPrototype {
  items = [];
  emptyCallback = () => {};
  tabIndex : number;
  constructor(protected events : Events, protected navCtrl : NavController, protected navParams : NavParams, firebaseProvider : FirebaseProvider, ngZone : NgZone
  ) {
    super(firebaseProvider,ngZone);
    this.tabIndex = this.navParams.data;
    let that = this;
    events.subscribe('reload-tabs', (index) => {
      if (that.tabIndex == index) {
        this.refreshData(this.emptyCallback);
      }
    });
  }
}
