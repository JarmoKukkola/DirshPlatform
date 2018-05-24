import {DistributionDb} from '../models/distributionDb'
import * as admin from 'firebase-admin';
import * as stringUtil from '../utils/stringUtil';

// return password to reveal gift card, socialMediaType, where gift card was shared and meesageId of social media post (used for deleting it later)
export let run = (db:admin.database.Database,val : DistributionDb, existingTokens:number, messageId:string,password:string, socialMediaType:number) => new Promise < void > ((resolve) => {
    // console.log('set new coupon to database');
    const updates = {};
    const newTokens = val.public.airdrop.balance / (144000 - val.public.airdrop.index - 1);
    const newId=(existingTokens==0?stringUtil.randomPath():val.latest.id)
    updates['coupons/' + newId] = {
        tokenType: 'Dirsh',
        amount: newTokens + existingTokens,
        air: true
    };
    updates['distribution/giftCard/' + newId] = true;
    if (val.latest && val.latest.id && newId != val.latest.id&&
        val.giftCard && val.giftCard[val.latest.id]) {
        updates['distribution/giftCard/' + val.latest.id] = null;
    }
    
    updates['distribution/public/airdrop/balance'] = Number(val.public.airdrop.balance - newTokens);
    updates['distribution/public/airdrop/index'] = Number(val.public.airdrop.index+1);
    updates['distribution/latest'] =
    {
        id: newId,
        password:password,
        mediaType:Number(socialMediaType),
        messageId:String(messageId)
    };
    // console.log(updates)
    return db
        .ref('/')
        .update(updates).then(()=>resolve());
});