export let run = (db, admin, val) => new Promise < void > ((resolve) => {
    /*
        All bounty programs are finished, when 24 000th gift card is distributed.
        The remaining tokens are added to the airdrop.
    */

    let publicData = val.public;
    let balance = publicData.airdrop.balance;
    let youtube = publicData.youtube;
    let article = publicData.article;
    let openSource = publicData.openSource;
    let community = publicData.community;

    let updates = {};

    updates['airdrop/balance'] = Number(balance + youtube + article + openSource + community);
    updates['youtube'] = Number(0);
    updates['article'] = Number(0);
    updates['openSource'] = Number(0);
    updates['community'] = Number(0);

    console.log(updates);
    
    return db
        .ref('/distribution/public/')
        .update(updates, (error) => {
            process.exit(0);
        });
});