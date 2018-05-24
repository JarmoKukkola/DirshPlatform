import { Component } from '@angular/core';

@Component({
  selector: 'features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {

  items=[
    [
      "Original Approach to Digital Currency",
      `Based mostly on original code.
      
      Based on Firebase Realtime Database, which provides many advantages compared to traditional digital currencies, such as, scalability, security, speed, and low cost.
      `,
      "refresh"
    ],
    [
      "Practical",
      `Simple to use.
      
      Complete feature set for a daily payment method.
      `,
      "accessibility"
    ],
    [
      "Cheap Transactions",
      `Dirsh transaction costs <0.1 Dirsh.
  
      Custom token transfers and creation gift cards cost 5 times the base transaction fee.
  
      100% of the transaction fee is burned, which causes the supply of Dirsh to reduce over time.
      `,
      "attach_money"
    ],
    [
      "Mobile Friendly",
      `Android app is available.

      Because of the lightweight design, should work with most budget smartphones.
      `,
      "phone_android"
    ],
    [
      "Google Account Login",
      `Your Dirsh account is connected to your Google account.
      
      Login with your usual password and username (which are never send to Dirsh).

      Improves security with two factor authentication.

      Account recovery is also possible with the usual account recovery options of your Google account.

      REST API transactions can be enabled for robots without Google account login.
      `,
      "account_box"
    ],
    [
      "Two Factor Authentication",
      `Two factor provided by your Google account.
  
      Can enforce login confirmation from two devices, such as computer and smartphone.
  
      Much improved security over traditional username + password based security.
      `,
      "https"
    ],
    [
      "Open Source",
      `Source code available on Github.
  
      The project is open sourced for two major reasons: A) to create transparency and B) to make contributing to the project possible.
  
      Project contributors can receive rewards.
      `,
      "visibility"
    ],
    [
      "Community Driven",
      `Activity in community is rewarded by bounties.

      Gift cards are shared to social media followers.
  
      Contributors to the open source project receive rewards.
  
      Youtube or article authors are also rewarded.
      `,
      "people"
    ],
    [
      "Gift Cards",
      `Gift cards with Dirsh or custom tokens can be created.
  
      The gift cards can be shared through social media, email, text message or even print media.
  
      Gift card creator and reclaimer do not know the account number of the other person.
      `,
      "card_giftcard"
    ],
    [
      "Lightweight with Instant Syncing",
      `Account is almost instantly usable on any device after restart of the app.
  
      Only information relevant to your account has to downloaded from the server.
      `,
      "update"
    ],
    [
      "Environmentally Friendly",
      `Optimized usage of resources.
      `,
      "public"
    ],
    [
      "Based on Proven Encryption Methods",
      `No experimental or unproved security, which could compromise your account.
      `,
      "enhanced_encryption"
    ],
    [
      "Keylogger Resistant",
      `Keylogger hacks are one of the most common ways of digital currency theft.

      Keylogger is a virus/malware hiding in your computer, which records all your keystrokes.
  
      Dirsh has efficient protection against keyloggers.
  
      Login confirmation can be enforced from two devices with two factor authentication.
      `,
      "keyboard_hide"
    ]
  ];

}
