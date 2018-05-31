import * as admin from 'firebase-admin';
import {TelegramUtil} from './telegramUtil';
import {TwitterUtil} from './twitterUtil';
import {SocialInterface} from './socialInterface';
import {RedditUtil} from './redditUtil';

export function getSocialUtil(socialMediaType : number) : SocialInterface {
    switch(socialMediaType) {
        case 0:
            return new TwitterUtil();
        case 1:
            return new RedditUtil();
        default:
            return new TelegramUtil();
    }
}

export function sendMessage(socialMediaType : number, topic : string, message : string) : Promise < string > {
    // console.log('Send message');
    return new Promise((resolve) => {
        return this
            .getSocialUtil(socialMediaType)
            .sendMessage(topic, message)
            .then((messageId) => {
                resolve(messageId);
            });
    });
}

export function deleteMessage(socialMediaType : number, id : string) : Promise < void > {
    // console.log('Delete message');
    return new Promise((resolve) => {
        return this
            .getSocialUtil(socialMediaType)
            .deleteMessage(id)
            .then(() => {
                resolve();
            });
    });
}