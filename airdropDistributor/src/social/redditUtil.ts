import { SocialInterface } from "./socialInterface";
import * as Snoowrap from 'snoowrap';

export class RedditUtil implements SocialInterface{
    
    bot:any;

    constructor(){
        this.bot=new Snoowrap({
            userAgent: 'DirshNodeJsGiftCardAirdrop',
            clientId: process.env.redditClientId,
            clientSecret: process.env.redditClientSecret,
            username: process.env.redditUser,
            password: process.env.redditPass
        });
        
    }

    sendMessage(topic:string, message : string) : Promise < string > {
        // console.log('Post Reddit: '+message);
        return new Promise((resolve) => {
                    return this.bot
                        .getSubreddit('Dirsh')
                        .submitSelfpost({title:topic,text:message})
                        .lock()
                        .then((data)=>{
                        console.log('reddit post id: '+data.name);
                        resolve(data.name);
                    }).catch((error)=>{
                        console.log('error posting Reddit: '+JSON.stringify(error));
                        resolve('');
                    });
                // });
        });
    }

    deleteMessage(id : string) : Promise < void > {
        // console.log('Delete Reddit post: ' + id);
        return new Promise((resolve) => {
            this.bot
                .getSubmission(id)
                .delete()
                .then(() => {
                    // console.log('Reddit post deleted');
                    resolve();
                }).catch((error)=>{
                    console.log('error deleting Reddit: '+JSON.stringify(error));
                    resolve();
                });
        });
    }
}