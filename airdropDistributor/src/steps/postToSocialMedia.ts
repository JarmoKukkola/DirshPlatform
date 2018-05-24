import {DistributionDb} from '../models/distributionDb'
import * as admin from 'firebase-admin';
import * as social from '../social/socialUtil';

// return password to reveal gift card, socialMediaType, where gift card was shared and meesageId of social media post (used for deleting it later)
export let run = (val : DistributionDb, socialMediaType:number, password:string) => new Promise < string> ((resolve) => {
    let index:Number=val.public.airdrop.index+1;
    return social
        .sendMessage(socialMediaType,
             'Gift Card Airdrop #' + index, 
             'Reclaim gift card at: https://dirsh.com/airdrop?p=' + password + ' This message will self-destruct in 10 minutes.'
            )
        .then((messageId)=>{
            resolve(messageId)
        });
    });