import {BurnedType} from './burnedType';

function removeItem(burnedDb, path: string, id: string) {
  const temp = {};
  for (const key in burnedDb[path]) {
    if (key !== id) {
      temp[key] = burnedDb[path][key];
    }
  }
  const tempObject = {};
  for (const key of Object.keys(burnedDb)) {
    if (key !== path) {
      tempObject[key] = burnedDb[key];
    } else if (Object.keys(temp).length > 0) {
      tempObject[path] = temp;
    }
  }
  return tempObject;
}

export let run = (admin: any, id: string, burnedType: BurnedType) =>
new Promise<void>(resolve => {
    console.log('trigger');
    return admin
      .database()
      .ref("burned")
      .transaction(function(burnedDb) {
        let tempBurnedDb={};
        if (burnedDb) {
          console.log("loaded burned: " + JSON.stringify(burnedDb));
          const previousBurned = burnedDb && burnedDb.stats && burnedDb.stats.totalBurned
            ? burnedDb.stats.totalBurned
            : 0;
          if(!('stats' in burnedDb)){
            burnedDb['stats']={};
            burnedDb['stats']['numberOfTokenTypes']=1;
            burnedDb['stats']['totalBurned']=0;
          }
          switch (burnedType) {
            case BurnedType.TOKEN:
            tempBurnedDb = removeItem(burnedDb, "createdTokens", id);
            tempBurnedDb['stats']['totalBurned'] = Number(previousBurned + burnedDb.createdTokens[id]);
            tempBurnedDb['stats']['numberOfTokenTypes']=tempBurnedDb['stats']['numberOfTokenTypes']+1;
            break;
          case BurnedType.SENT:
            tempBurnedDb = removeItem(burnedDb, "sent", id);
            tempBurnedDb['stats']['totalBurned'] = Number(previousBurned + burnedDb.sent[id]);
            break;
            case BurnedType.API_KEY:
            tempBurnedDb = removeItem(burnedDb, "apiKey", id);
            tempBurnedDb['stats']['totalBurned'] = Number(previousBurned + burnedDb.apiKey[id]);
            break;
          }
          tempBurnedDb['tempId'] = id;
          tempBurnedDb['type'] = Number(burnedType);
          console.log("save burned: " + JSON.stringify(tempBurnedDb));
        }
        return tempBurnedDb;
      }, function(error, committed, snapshot) {
        if (error) {
          console.log('Transaction failed abnormally!', error);
        } else if (!committed) {
          console.log('We aborted the transaction (because ada already exists).');
        } else {
          // console.log("counting sent burned success");
          return resolve();
        }
      });
  });
