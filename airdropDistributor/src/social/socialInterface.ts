export interface SocialInterface{
    sendMessage(topic:string,text : string) : Promise < string >;
    deleteMessage(id : string) : Promise < void >;
}