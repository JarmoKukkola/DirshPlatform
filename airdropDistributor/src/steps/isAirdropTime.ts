import * as endBounties from './endBounties'
import {DistributionDb} from '../models/distributionDb'
import * as admin from 'firebase-admin';

export let run = (db:admin.database.Database, val:DistributionDb) => new Promise < void > ((resolve) => {
    // console.log('index: ' + val.public.airdrop.index); // index of previous gift card
    // console.log('10 minute cycles passed since start: ' + Math.floor(timeSinceStart / 600000));
    if (val.public.airdrop.index >= Math.floor((Date.now()-val.public.airdrop.startTime) / 600000)) {
        console.log('Too early to give a gift');
        process.exit(0); //end process
        return resolve();  
    }

    // console.log('balance: ' + val.public.airdrop.balance); // balance left for airdrop

    if (val.public.airdrop.balance <= 0.1) {
        console.log('Too low balance to give a gift card. Time to stop airdrop.');
        process.exit(0); //end process
        return resolve();  // trigger airdrop
    }

    if (
        val.public.airdrop.index == 110000
        &&
        (
        val.public.youtube!=0
        ||
        val.public.article!=0
        ||
        val.public.openSource!=0
        ||
        val.public.community!=0
        )
    ) {
        return endBounties.run(db,admin,val);
    } else {
        return resolve();  // trigger airdrop
    }
});