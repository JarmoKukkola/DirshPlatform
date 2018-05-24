import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  items=[
      [
      "Deflationary",
      `Total supply of Dirsh decreases over time.
    
      Collected transaction fees are burned.

      Fees to create custom tokens are burned.

      Fees to enable REST API keys are burned.
      `,
      "trending_up"
      ],
      [
      "Private",
      `Transaction details and account balances are not visible to the public.
  
      Payer can optionally hide his account number from the receiver.
  
      When using gift cards, even the payer does not know the account number of the receiver.
      `,
      "fingerprint"
    ],
    [
      "Scalable",
      `Technically 100 000 clients can connect simultaneously.
  
      The total number of account holders is much higher, because all the users are not connected at once.
      
      Flexible scalability is based on Firebase Realtime Database. 
      `,
      "terrain"
    ],
      [
      "Instant" ,
      `Tested to have about 5 second confirmation time.
    
      Constant speed with up to 100 000 simultaneously connected clients.
      `,
      "flash_on"
    ],
    [
      "Easy Platform" ,
      `Create custom tokens without coding.
    
      Creating custom tokens costs 1000 Dirsh.
      
      Custom token transaction fee is <0.5 Dirsh.
      `,
      "touch_app"
      ],
      [
      "Secure" ,
      `Proven encryption standards.

      End-to-end encryption.
      
      Two factor authention (computer + smartphone).
      
      Keylogger resistant.
  
      Privacy keeps your account balance secret.
      
      Connected to your Google account.
      `,
      "security"
      ]
    ];
}
