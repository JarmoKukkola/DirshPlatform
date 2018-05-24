import * as functions from 'firebase-functions';
import * as passwordToGiftCard from './passwordToGiftgard';
import * as sendWithApiKey from './sendWithApiKey';
import * as countBurned from './countBurned';
import * as admin from 'firebase-admin';
import {BurnedType} from './burnedType';

const options = JSON.parse(process.env.FIREBASE_CONFIG);
options["databaseAuthVariableOverride"] = {
      uid: "my-service-worker"
    };
admin.initializeApp(options);

// log unhandled errors
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", reason.stack || reason);
});

exports.checkRecaptcha = functions.https.onRequest((req, res) => {
  return passwordToGiftCard.run(admin,req,res);
});

exports.send = functions.https.onRequest((req, res) => {
  return sendWithApiKey.run(admin,req,res);
});

exports.countBurnedSent = functions.database
  .ref("/burned/sent/{id}")
  .onCreate((snap,context) => {
    return countBurned.run(admin,context.params.id,BurnedType.SENT);
  });

exports.countBurnedCustomTokenCreation = functions.database
  .ref("/burned/createdTokens/{id}")
  .onCreate((snap,context) => {
    return countBurned.run(admin,context.params.id,BurnedType.TOKEN);
  });

exports.countBurnedApiKey = functions.database
  .ref("/burned/apiKey/{id}")
  .onCreate((snap,context) => {
    return countBurned.run(admin,context.params.id,BurnedType.API_KEY);
  });