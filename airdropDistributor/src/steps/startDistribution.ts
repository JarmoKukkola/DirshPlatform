import * as admin from 'firebase-admin';

export let run = (db)=> new Promise < void > ((resolve) => {
    let updates={};
     // @ts-ignore: ignore json error, because it works
     updates['bountyDistributor']=process.env.bountyDistributor;
     // @ts-ignore: ignore json error, because it works
    updates['founderAccount']=process.env.founderAccount;
    //  @ts-ignore: ignore json error, because it works
    updates['users/'+process.env.founderAccount+'/balances/Dirsh']=22500000;
    updates['tokenTypes/Dirsh/totalSupply']=90000000;
    updates['transactionFee']=0.099999;
    updates['minimumAmountToSend']=1;
    updates['distribution/public/airdrop']={
        balance:22500000,
        index:-1,
        startTime:admin.database.ServerValue.TIMESTAMP
    };
    updates['distribution/public/article']=9000000;
    updates['distribution/public/community']=18000000;
    updates['distribution/public/openSource']=9000000;
    updates['distribution/public/youtube']=9000000;
    console.log(updates);
    return db.ref('/').update(updates,
     (error) => {
        if (error) {
            console.log("distribution could not be started." + error);
        } else {
            console.log('distribution was started'); // start distribution of token via airdrop
        }
        process.exit(0);
    });
});