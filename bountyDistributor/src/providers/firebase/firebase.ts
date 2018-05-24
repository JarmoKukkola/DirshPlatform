import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Platform, AlertController} from 'ionic-angular';

@Injectable()
export class FirebaseProvider {

  constructor(private platform : Platform) {}

  public defaultTokenName() : string {
    return 'Dirsh';
  }

  public getCurrentUser() : firebase.User | null {
    return firebase
      .auth()
      .currentUser;
  }

  public getUid() : string {
    if(this.getCurrentUser()) {
      return this
        .getCurrentUser()
        .uid;
    } else {
      return null;
    }
  }

  public getFbDb() : firebase.database.Database {
    return firebase.database();
  }

  public getPath(ref : firebase.database.Reference) : string {
    return ref
      .path
      .toString();
  }

  public getRootRef() : firebase.database.Reference {
    return this
      .getFbDb()
      .ref();
  }

  public getDistributionPublicRef():firebase.database.Reference {
    return this
      .getRootRef()
      .child('distribution/public');
  }

  public send(type:string, amount : number, balance : number, receiverAddress : string) : Promise < firebase.database.Reference > {
    return new Promise((resolve) => {
      let updates = {};
      let id = this.generatePushID();

      updates['users/'+receiverAddress+'/pendingReceived/'+id]={
        tokenType:'Dirsh',
        amount:Number(amount),
        index:0,
        time:firebase.database.ServerValue.TIMESTAMP,
        senderAddress: type + ' bounty'
      };

      updates[this.getPath(this.getDistributionPublicRef())+'/'+type]=Number(balance-amount);
      updates['distribution/accountForBounty']=receiverAddress;
      updates['distribution/idForBounty']=id;
      updates[this.getPath(this.getBountySentRef().child(id))]={
        receiverAddress:receiverAddress,
        amount:Number(amount),
        time:firebase.database.ServerValue.TIMESTAMP
      };
      console.log(updates)
      this.getRootRef().update(updates);
      resolve();
    });
  }

  public getBountySentRef():firebase.database.Reference{
    return this.getRootRef().child('distribution/bountySent');
  }

  private generatePushID():string{
    return this.getRootRef().push().key;   
  }
}
