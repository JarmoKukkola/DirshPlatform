export class DistributionDb{
    public:{
        airdrop:{
            balance:number,
            startTime:number,
            index:number
        },
        youtube:number,
        article:number,
        openSource:number,
        community:number
    };
    latest:{
      id:string;
      password:string;
      mediaType:number;
      messageId:string;
    };
    giftCard:[
        {
            key:string;
            amount:number;
        }
    ];

}