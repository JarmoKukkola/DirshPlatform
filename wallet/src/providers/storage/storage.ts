import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class StorageProvider {

  constructor(private storage : Storage) {}

  SHARE_SENDING_ADDRESS = 'SHARE_SENDING_ADDRESS';

  getShouldShareSendingAddress() : Promise < boolean > {
    return new Promise((resolve) => {
      this
        .storage
        .get(this.SHARE_SENDING_ADDRESS)
        .then((val) => {
          if (val != undefined) {
            resolve(val);
          } else {
            resolve(true);
          }
        });
    });
  }

  setShouldShareSendingAddress(shareSendingAddress : boolean) {
    this
      .storage
      .set(this.SHARE_SENDING_ADDRESS, shareSendingAddress);
  }

  PREVIOUS_RECEIVER_ADDRESS = 'PREVIOUS_RECEIVER_ADDRESS';

  getPreviousReceiverAddress() : Promise < string > {
    return new Promise((resolve) => {
      this
        .storage
        .get(this.PREVIOUS_RECEIVER_ADDRESS)
        .then((val) => {
          if (val != undefined) {
            resolve(val);
          } else {
            resolve('');
          }
        });
    });
  }

  setPreviousReceiverAddress(previousReceiverAddress : string) {
    this
      .storage
      .set(this.PREVIOUS_RECEIVER_ADDRESS, previousReceiverAddress);
  }

  COUPON_AMOUNT = 'COUPON_AMOUNT';

  getCouponAmount() : Promise < number > {
    return new Promise((resolve) => {
      this
        .storage
        .get(this.COUPON_AMOUNT)
        .then((val) => {
          if (val != undefined) {
            resolve(val);
          } else {
            resolve(10);
          }
        });
    });
  }

  setCouponAmount(couponBalance : number) {
    this
      .storage
      .set(this.COUPON_AMOUNT, couponBalance);
  }

  COUPON_TOKEN_TYPE = 'COUPON_TOKEN_TYPE';

  getCouponTokenType() : Promise < string > {
    return new Promise((resolve) => {
      this
        .storage
        .get(this.COUPON_TOKEN_TYPE)
        .then((val) => {
          if (val != undefined) {
            resolve(val);
          } else {
            resolve('Dirsh');
          }
        });
    });
  }

  setCouponTokenType(tokenType : string) {
    this
      .storage
      .set(this.COUPON_TOKEN_TYPE, tokenType);
  }
}
