import { DistributionDb } from "../models/distributionDb";
import * as admin from "firebase-admin";

// return number of tokens that were not reclaimed from previous airdrop
export let run = (db: admin.database.Database, val: DistributionDb) =>
  new Promise<number>(resolve => {
    if (!val.giftCard||!val.giftCard[val.latest.id]) {
      //gift card was used
      // console.log('Gift card was used');

      return resolve(0); //all tokens are used
    }

    let existingTokens = 0;
    return db
      .ref("coupons/" + val.latest.id)
      .transaction(coupon => {
        if (coupon) {
          // console.log("Previous coupon was not used.");
          existingTokens = coupon.amount;
          coupon["hidden"] = true; //prevent using of the coupon until we are finished
          // console.log(coupon);
          return coupon;
        }
        // console.log("Previous coupon was used or data not synced yet");
        existingTokens = 0;
        return null;
      })
      .then(() => {
        return resolve(existingTokens);
      });
  });
