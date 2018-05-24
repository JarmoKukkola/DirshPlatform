import {DistributionDb} from '../models/distributionDb'
import * as admin from 'firebase-admin';
import * as social from '../social/socialUtil';

// return number of tokens that were not reclaimed from previous airdrop
export let run = (val : DistributionDb) => new Promise < void > ((resolve) => {
    let previousSocialMediaType = val.latest && val.latest.mediaType;
    // console.log('previousSocialMediaType: '+previousSocialMediaType)
    if(!previousSocialMediaType){
        resolve();
    }
    let previousSocialMediaKey = val.latest.messageId;
    return social.deleteMessage(previousSocialMediaType, previousSocialMediaKey).then(()=>{
        resolve();
    });
});