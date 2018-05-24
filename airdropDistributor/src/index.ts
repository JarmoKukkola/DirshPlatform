import * as admin from "firebase-admin";
import * as serviceAccount from "./serviceAccountKey.json"; //firebase service account keys https://firebase.google.com/docs/admin/setup
import { DistributionDb } from "./models/distributionDb";
import * as startDistribution from "./steps/startDistribution";
import * as isAirdropTime from "./steps/isAirdropTime";
import * as previousGiftcardStatus from "./steps/previousGiftcardStatus";
import * as deleteSocialMediaPost from "./steps/deleteSocialMediaPost";
import * as postToSocialMedia from "./steps/postToSocialMedia";
import * as writeCouponToDatabase from "./steps/writeCouponToDatabase";
import * as stringUtil from "./utils/stringUtil";

require("dotenv").config();

// log unhandled errors
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", reason.stack || reason);
  process.exit(0);
});

admin.initializeApp({
  credential: admin.credential
    // @ts-ignore: ignore json error, because it works
    .cert(serviceAccount),
  databaseAuthVariableOverride: {
    uid: "my-service-worker"
  },
  databaseURL: "https://dirsh-d6d60.firebaseio.com"
});

let db = admin.database();
// console.log('read distribution');
db
  .ref("distribution")
  .once("value")
  .then(snapshot => {
    let val: DistributionDb = snapshot.val();
    if (!val) {
      console.log('distribution not started');
      return startDistribution.run(db);
    } else {
      return isAirdropTime.run(db, val).then(() => {
        // console.log('Time to distribute a gift card');

        return previousGiftcardStatus
          .run(db, val)
          .then((existingTokens: number) => {
            // console.log('Tokens remaining from previous airdrop '+existingTokens);
            let socialMediaType: number = Math.floor(Math.random() * 3); //random 0 to 2
            // console.log('socialMediaType: '+socialMediaType);
            let password = stringUtil.randomPath();
            // console.log('password: '+password);

            return Promise.all([
              deleteSocialMediaPost.run(val),
              postToSocialMedia
                .run(val, socialMediaType, password)
                .then((messageId: string) => {
                  // console.log('messageId: '+messageId);
                  return writeCouponToDatabase
                    .run(db,val,existingTokens,messageId,password,socialMediaType);
                })
            ]).then(()=>{
                console.log("Airdrop round " +Number(val.public.airdrop.index + 1) +" successful");
                process.exit(0);
            });
          });
      });
    }
  });
