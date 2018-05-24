import { SocialSharing } from '@ionic-native/social-sharing';

export abstract class BarcodePage {
  
  constructor(private socialSharing:SocialSharing) {
  }

  abstract getMessage();

  abstract getTopic();

  getBarCode(){
    return document
    .getElementsByClassName('aclass')
    .item(0)
    .children
    .item(0)
    .attributes[0]
    .textContent;
  }

  share(){
  this
    .socialSharing
    .share(this.getMessage(), this.getTopic(), this.getBarCode())
    .then(() => {
      console.log('Shared successfully');
    })
    .catch(() => {
      console.log('Sharing failed');
    });
  }
}
