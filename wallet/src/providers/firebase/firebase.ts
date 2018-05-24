import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { Platform, AlertController } from "ionic-angular";
import * as  randomBytes from 'randombytes';

@Injectable()
export class FirebaseProvider {
  constructor(private platform: Platform) { }

  isLoggedIn = false;
  transactionFee = 0.099999;

  public getHigherFee() {
    return this.transactionFee * 5;
  }

  public isGoogleLoggedIn(): boolean {
    let providers = this.getCurrentUser().providerData;
    for (let user of providers) {
      if (user.providerId === "google.com") {
        return true;
      }
    }
    return false;
  }

  public isApp(): boolean {
    return this.platform.is("mobile") && !this.platform.is("mobileweb");
  }

  public defaultTokenName(): string {
    return "Dirsh";
  }

  public getCurrentUser(): firebase.User | null {
    return firebase.auth().currentUser;
  }

  public getUid(): string {
    if (this.getCurrentUser()) {
      return this.getCurrentUser().uid;
    } else {
      return null;
    }
  }

  public getFbDb(): firebase.database.Database {
    return firebase.database();
  }

  public getPath(ref: firebase.database.Reference): string {
    return ref.path.toString();
  }

  public getRootRef(): firebase.database.Reference {
    return this.getFbDb().ref();
  }

  public getUsersRef(userId: string = null): firebase.database.Reference {
    return this.getFbDb()
      .ref("users")
      .child(userId ? userId : this.getUid());
  }

  public getReceivedRef(userId: string = null): firebase.database.Reference {
    return this.getUsersRef(userId).child("received");
  }

  public getSentRef(tokenType: string = null): firebase.database.Reference {
    return this.getUsersRef().child("sent");
  }

  public getBalancesRef(tokenType: string = null): firebase.database.Reference {
    let ref = this.getUsersRef().child("balances");
    if (tokenType) {
      ref = ref.child(tokenType);
    }
    return ref;
  }

  public getTransactionFeeRef(): firebase.database.Reference {
    return this.getRootRef().child("transactionFee");
  }

  public getPendingReceivedRef(userId: string = null) {
    return this.getUsersRef(userId).child("pendingReceived");
  }

  public getPendingSentRef() {
    return this.getUsersRef().child("pendingSent");
  }

  logTime(isStartNotEnd: boolean) {
    let time = new Date();
    console.log(
      (isStartNotEnd ? "startTime: " : "endTime: ") +
      time.getHours() +
      ":" +
      time.getMinutes() +
      ":" +
      time.getSeconds()
    );
  }

  getBaseUpdate(): {} {
    // Cleans temporary transaction related data. They are mainly used for enforcing
    // database permissions.
    let updates = {};
    updates[this.getPath(this.getPendingSentRef())] = null;
    updates[this.getPath(this.getLatestCouponIdRef())] = null;
    updates[this.getPath(this.getLatestTokenNameRef())] = null;
    updates[this.getPath(this.getProcessingReceivedIdRef())] = null;
    return updates;
  }

  public send(
    tokenType: string,
    amount: number,
    balances: {},
    receiverAddress: string,
    message: string,
    shareSenderAddress: boolean
  ): Promise<boolean> {
    // this.logTime(true);
    return new Promise(resolve => {
      let transactionDb = {
        tokenType: tokenType,
        amount: amount,
        time: firebase.database.ServerValue.TIMESTAMP
      };
      if (shareSenderAddress) {
        transactionDb["senderAddress"] = this.getUid();
      }
      if (message && message.length > 0) {
        transactionDb["message"] = message;
      }

      let updates = this.getBaseUpdate();
      let id = this.generatePushID();
      updates[
        this.getPath(this.getPendingReceivedRef(receiverAddress).child(id))
      ] = transactionDb;

      updates[this.getPath(this.getPendingSentRef())] = {
        id: id,
        tokenType: tokenType,
        amount: amount,
        receiverAddress: receiverAddress
      };
      if (tokenType === this.defaultTokenName()) {
        updates[this.getPath(this.getBalancesRef(tokenType))] =
          balances[tokenType] - amount - this.transactionFee;
      } else {
        updates[this.getPath(this.getBalancesRef(tokenType))] =
          balances[tokenType] - amount;
        updates[this.getPath(this.getBalancesRef(this.defaultTokenName()))] =
          balances[this.defaultTokenName()] - this.getHigherFee();
      }
      let sentDb = {
        tokenType: tokenType,
        amount: amount,
        receiverAddress: receiverAddress,
        time: firebase.database.ServerValue.TIMESTAMP
      };
      if (message && message.length > 0) {
        sentDb["message"] = message;
      }
      updates[this.getPath(this.getSentRef().child(id))] = sentDb;
      updates[this.getPath(this.getBurnedSentRef().child(id))] =
        tokenType == this.defaultTokenName()
          ? this.transactionFee
          : this.getHigherFee();
      // console.log(updates)
      this.getRootRef()
        .update(updates)
        .then(() => {
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });

      // this.logTime(false);
    });
  }

  public getBurnedRef(): firebase.database.Reference {
    return this.getRootRef().child("burned");
  }

  public getBurnedApiKeyRef(): firebase.database.Reference {
    return this.getBurnedRef().child("apiKey").child(this.getUid());
  }

  public getBurnedSentRef(): firebase.database.Reference {
    return this.getBurnedRef().child("sent");
  }

  receivePayment(
    key: string,
    tokenType: string,
    amount: string,
    timeStamp: number,
    senderAddress: string,
    message: string,
    newBalance: number
  ): Promise<null> {
    return new Promise(response => {
      let updates = this.getBaseUpdate();
      updates[this.getPath(this.getPendingReceivedRef().child(key))] = null;
      updates[this.getPath(this.getProcessingReceivedIdRef())] = key;
      updates[this.getPath(this.getBalancesRef(tokenType))] = newBalance;
      let received = {
        tokenType: tokenType,
        amount: Number(amount),
        time: timeStamp
      };
      if (senderAddress) {
        received["senderAddress"] = senderAddress;
      }
      if (message) {
        received["message"] = message;
      }
      updates[this.getPath(this.getReceivedRef().child(key))] = received;
      // console.log(updates);
      this.getRootRef().update(updates);
    });
  }

  getProcessingReceivedIdRef() {
    return this.getUsersRef().child("processingReceivedId");
  }

  getCustomTokensRef(): firebase.database.Reference {
    return this.getRootRef().child("tokenTypes");
  }

  getNumberOfTokenTypesRef(): firebase.database.Reference {
    return this.getBurnedRef().child("numberOfTokenTypes");
  }

  getLatestCouponIdRef(): firebase.database.Reference {
    return this.getUsersRef().child("latestCouponId");
  }

  createCoupon(
    tokenType: string,
    amount: number,
    id: string
  ): Promise<boolean> {
    amount = Number(amount);
    let that = this;
    return new Promise(response => {
      that.getBalancesRef().once("value", function (snapshot) {
        let dirshBalance = snapshot.child(that.defaultTokenName()).val();
        let tokenBalance = snapshot.child(tokenType).val();
        let updates = that.getBaseUpdate();
        let isDefaultToken = tokenType == that.defaultTokenName();
        if (!isDefaultToken) {
          updates[
            that.getPath(that.getBalancesRef(that.defaultTokenName()))
          ] = Number(dirshBalance - that.getHigherFee());
        }
        updates[that.getPath(that.getBalancesRef(tokenType))] = Number(
          tokenBalance -
          (isDefaultToken ? that.getHigherFee() + amount : amount)
        );
        updates[that.getPath(that.getLatestCouponIdRef())] = id;
        let coupon = {
          tokenType: tokenType,
          amount: Number(amount)
        };
        updates[that.getPath(that.getUsersCouponsRef().child(id))] = coupon;
        updates[that.getPath(that.getCouponsRef().child(id))] = coupon;
        updates[
          that.getPath(that.getBurnedSentRef().child(id))
        ] = that.getHigherFee();
        let sentDb = {
          tokenType: tokenType,
          amount: amount,
          receiverAddress: "Coupon",
          time: firebase.database.ServerValue.TIMESTAMP
        };
        updates[that.getPath(that.getSentRef().child(id))] = sentDb;
        that
          .getRootRef()
          .update(updates)
          .then(() => {
            response(true);
          })
          .catch(() => {
            response(false);
          });
      });
    });
  }

  getUsersCouponsRef(): firebase.database.Reference {
    return this.getUsersRef().child("coupons");
  }

  getCouponsRef(): firebase.database.Reference {
    return this.getRootRef().child("coupons");
  }

  getLatestTokenNameRef(): firebase.database.Reference {
    return this.getUsersRef().child("latestTokenType");
  }

  createCustomToken(
    name: string,
    totalSupply: number,
    alertCtrl: AlertController
  ): Promise<void> {
    let that = this;
    return new Promise(resolve => {
      return that
        .getBalancesRef(that.defaultTokenName())
        .once("value", function (dirshSnapshot) {
          let newDirshBalance = dirshSnapshot.val() - 1000;
          if (newDirshBalance < 0) {
            alertCtrl
              .create({
                title: "Too low " + that.defaultTokenName() + " balance",
                buttons: [
                  {
                    text: "OK",
                    role: "cancel",
                    handler: data => {
                      resolve();
                    }
                  }
                ]
              })
              .present();
          } else {
            let updates = that.getBaseUpdate();
            updates[
              that.getPath(that.getBalancesRef(that.defaultTokenName()))
            ] = Number(newDirshBalance);
            updates[that.getPath(that.getBalancesRef(name))] = Number(
              totalSupply
            );
            updates[that.getPath(that.getCustomTokensRef().child(name))] = {
              totalSupply: Number(totalSupply),
              creator: that.getUid()
            };
            updates[that.getPath(that.getLatestTokenNameRef())] = name;
            updates[
              that.getPath(that.getBurnedRef().child("createdTokens/" + name))
            ] = 1000;
            let sentDb = {
              tokenType: that.defaultTokenName(),
              amount: 1000,
              receiverAddress: "Created " + name + " token",
              time: firebase.database.ServerValue.TIMESTAMP
            };
            updates[that.getPath(that.getSentRef().child(name))] = sentDb;
            // console.log(updates);
            that
              .getRootRef()
              .update(updates)
              .then(() => {
                //Creating token succeed
                let message = "Creating " + name + " successful.";
                alertCtrl
                  .create({
                    title: message,
                    buttons: [
                      {
                        text: "OK",
                        role: "cancel",
                        handler: data => {
                          resolve();
                        }
                      }
                    ]
                  })
                  .present();
              })
              .catch(() => {
                //Creating token failed
                let message = "Creating " + name + " failed.";
                alertCtrl
                  .create({
                    title: message,
                    buttons: [
                      {
                        text: "OK",
                        role: "cancel",
                        handler: data => {
                          resolve();
                        }
                      }
                    ]
                  })
                  .present();
              });
          }
        });
    });
  }

  reclaimGiftCard(id: string): Promise<any[]> {
    let that = this;
    let responseArray = [];
    responseArray.push(-1);
    return new Promise(resolve => {
      this.getCouponsRef()
        .child(id)
        .once("value")
        .then(function (snapshot) {
          let val = snapshot.val();
          if (val) {
            let tokenType = val.tokenType;
            let amount = val.amount;
            let isAirdop = val.air;
            that
              .getBalancesRef(tokenType)
              .once("value")
              .then(function (snapshop) {
                let balance = snapshop.val();
                let updates = that.getBaseUpdate();
                updates[that.getPath(that.getBalancesRef(tokenType))] =
                  balance + amount;
                updates[that.getPath(that.getCouponsRef().child(id))] = null;
                updates[that.getPath(that.getLatestCouponIdRef())] = id;
                let receivedDb = {
                  tokenType: tokenType,
                  amount: amount,
                  senderAddress: "Coupon",
                  time: firebase.database.ServerValue.TIMESTAMP
                };
                updates[
                  that.getPath(that.getReceivedRef().child(id))
                ] = receivedDb;
                if (isAirdop) {
                  updates["/distribution/giftCard/" + id] = null;
                }
                // console.log(updates);
                that
                  .getRootRef()
                  .update(updates)
                  .then(() => {
                    responseArray[0] = amount;
                    responseArray.push(tokenType);
                    console.log("success coupon reclaiming");
                    resolve(responseArray);
                  })
                  .catch(() => {
                    resolve(responseArray);
                  });
              });
          } else {
            resolve(responseArray);
          }
        });
    });
  }

  public getBurnedStatsRef(userId: string = null): firebase.database.Reference {
    return this.getBurnedRef().child("stats");
  }

  public getApiKey(): firebase.database.Reference {
    return this.getUsersRef().child("apiKey");
  }

  public setApiKey(key: string): Promise<boolean> {
    let that = this;
    return new Promise((resolve) => {
      this.getBalancesRef().child(that.defaultTokenName()).once('value').then(function (snapshot) {
        const dirshBalance = snapshot.val();
        let updates = that.getBaseUpdate();
        updates[that.getPath(that.getApiKey())] = key;
        updates[that.getPath(that.getBurnedApiKeyRef())] = that.getHigherFee();
        updates[that.getPath(that.getBalancesRef().child(that.defaultTokenName()))] = dirshBalance - that.getHigherFee();
        // console.log(updates);
        that.getRootRef().update(updates).then(() => {
          resolve(true);
        }).catch(() => {
          resolve(false);
        });
      }).catch(() => {
        resolve(false);
      });;
    });
  }

  public getDistributionPublicRef(userId: string = null): firebase.database.Reference {
    return this.getRootRef().child("distribution/public");
  }

  public deleteAccount(): Promise<boolean> {
    return new Promise((resolve) => {
      const user = firebase.auth().currentUser;

      return user.delete().then(()=>{
        console.log('user deleted')
        return resolve(true);
      }).catch(function (error) {
        console.log('user deletion error')
        return resolve(false);
      });
    });
  }

  generatePushID(): string {
    return this.getRootRef().push().key;
  }

  generateCouponID(): string {
    return this.generatePushID() + this.randomString(10);
  }

  roundDown(i: number) {
    return Math.floor(i * 10000) / 10000;
  }

  roundUp(i: number) {
    return Math.ceil(i * 1000) / 1000;
  }

  public randomString(i: number) { //generate random string with i length
    return randomBytes(i / 2).toString('hex')
  }
}
