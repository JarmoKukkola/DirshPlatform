import * as Twitter from 'twitter';
import {SocialInterface} from './socialInterface';

export class TwitterUtil implements SocialInterface {

    client : any;

    constructor() {
        this.client = new Twitter({consumer_key: process.env.twitterConsumerKey,
            consumer_secret: process.env.twitterConsumerSecret,
            access_token_key: process.env.twitterAccessToken,
            access_token_secret: process.env.twitterAccess_token_secret
        });
    }

    sendMessage(topic:string,message : string) : Promise < string > {
        // console.log('Post Twitter: ' + message);
        return new Promise((resolve) => {
            this
                .client
                .post('statuses/update', {
                    status: topic+'. '+message
                }, function (error, tweet, response) {
                    if (error) {
                        console.log('error posting tweet: ' + JSON.stringify(error));
                        resolve('');
                    } else {
                        let messageId = tweet.id_str;
                        console.log('twitter messageId: ' + messageId);
                        resolve(messageId);
                    }
                });
        });
    }

    deleteMessage(id : string) : Promise < void > {
        // console.log('Delete Twitter post: ' + id);
        return new Promise((resolve) => {
            resolve();
            this
                .client
                .post('statuses/destroy/' + id+'.json', function (error, tweet, response) {
                    if (error) {
                        console.log('error deleting tweet: ' + JSON.stringify(error));
                        resolve();
                    } else {
                        // console.log('successfully deleted tweet');
                        resolve();
                    }
                });
        });
    }
}