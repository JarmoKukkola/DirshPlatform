import * as TelegramBot from 'node-telegram-bot-api';
import { SocialInterface } from './socialInterface';
const TELEGRAM_CHAT = '@DirshPlatform';

export class TelegramUtil implements SocialInterface{
    
    bot:any;

    constructor(){
        this.bot=new TelegramBot(process.env.telegramKey, {polling: false});
    }

    sendMessage(topic:string, message : string) : Promise < string > {
        // console.log('Post Telegram: '+message);
        return new Promise((resolve) => {
            return this.bot
                .sendMessage(TELEGRAM_CHAT, topic+'. '+ message)
                .then((message) => {
                    let messageId = message['message_id'];
                    console.log('telegram message_id: ' + messageId);
                    resolve(messageId);
                });
        });
    }

    deleteMessage(id : string) : Promise < void > {
        // console.log('Delete Telegram post: ' + id);
        return new Promise((resolve) => {
            return this.bot
                .deleteMessage(TELEGRAM_CHAT, id)
                .then(() => {
                    resolve();
                }).catch(()=>{
                    console.log('Failed to Telegram post: '+id)
                    resolve();  
                });
        });
    }
}