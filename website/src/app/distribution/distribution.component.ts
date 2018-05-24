import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'distribution',
  templateUrl: './distribution.component.html',
  styleUrls: ['./distribution.component.scss']
})
export class DistributionComponent {

  items=[
    [
      'No ICO',
      `Dirsh had no ICO.
      
      Free Dirsh tokens are distributed through airdrops (25%) and bounties (50%).
      
      Founder keeps 25% of the total supply.
      
      Initial total supply is 90 000 000, which decreases as time passes.
      `,
      'favorite'
    ],
    [
      'Gift Card Airdrops',
      `Users can reclaim gift cards shared on our Twitter, Reddit and Telegram channels.

      Each channel has their unique gift cards.

      Reclaimer of the gift card has to solve a reCAPTCHA to prevent cheating.

      The gift cards can be reclaimed with by inserting the gift card code to 'Menu - Gift Cards - Reclaim Gift Cards'.

      On average, one gift cards per 10 minutes is shared on random social media channel.

      If nobody reclaims the shared gift card within 10 minutes, it will be destroyed and its value will be added to the next round.

      There will be totally 144 000 gift cards to reclaim.

      Distribution is expected to take 1000 days.

      At minimum, 22 500 000 Dirsh will be distributed (25%) through airdrops.

      When 100 000 gift cards have been airdropped, accepting applications to bounty programs is stopped. When 110 000 gift cards have been airdropped, remaining tokens in bounty pools are transferred to the airdrop. The value of the remaining gift cards is increased to distribute the remaining tokens evenly.
      
      Each gift card can be reclaimed only once.
      
      The same user can reclaim many coupons.
      
      We reserve a right to change the platforms, where the gift cards are distributed.
      `,
      'card_giftcard'
    ],
    [
      'Youtube Creators',
      `Maximum 9 000 000 Dirsh will be distributed (10%).

      The reward: 15 000 Dirsh.

      The minimum length of the section talking about Dirsh is 2 minutes.

      Dirsh has to be mentioned on the title.

      https://dirsh.com and your Dirsh address has to be mentioned on the description.

      Each unique author can get only one Youtube video reward.

      You have to show your face in the video (to prevent multiple submissions per author).

      You have to disclose that you will get a reward for making the video.
      
      Reclaim your bounties by using the contact form (top of the page).
      `,
      'personal_video'
    ],
    [
      'Article Authors',
      `Maximum 9 000 000 Dirsh will be distributed (10%).

      The reward: 15 000 Dirsh.

      Article has minimum 300 words.

      Copies of other articles with minor modifications are not allowed.

      Dirsh has to be mentioned on the title.

      https://dirsh.com and your Dirsh address has to be mentioned on the article.

      Each unique author can get only one article reward.

      Article has to be published on some publicly available website.

      Your real name has to be mentioned in the article (to prevent duplicate submissions per author).

      You have to disclose in the article that you will get a reward for writing the article.
      
      Reclaim your bounties by using the contact form (top of the page).
      `,
      'create'
    ],
    [
      'Open Source Contributions',
      `Maximum 9 000 000 Dirsh will be distributed (10%).

      You will get the reward, if we merge your pull request on Github.

      Only high quality contributions will be merged.

      We reserve the right to not merge contributions that do not follow our vision.

      1500 is the reward for minor bug fix or enhancement.

      15000 is the reward for medium severity bug fix or new feature.

      150000 is the reward for critical bug fix.
      
      Max total reward per person is 150 000 Dirsh.

      The contribution has to follow GPL 3.0 license.

      Your have to give permission to put your real name, picture and github profile on the list of contributors on our website.
      
      Reclaim your bounties by using the contact form (top of the page).
      `,
      'code'
    ],
    [
      'Community Rewards',
      `Maximum 18 000 000 Dirsh will be distributed (20%).

      Other significant contributions that do not fall in the other categories will rewarded.

      Amount of the reward will be decided on case by case basis (can be 100, 1000, 10000, 10 000, 100 000 or 1 000 000).

      Describe the activity or achievement that you did in detail.

      We have to be able to confirm that you were the one who did the described contribution.

      Max 10 rewards per user.

      Remember to follow laws and regulations.
      
      Reclaim your bounties by using the contact form (top of the page).
      `,
      'group'
    ],
    [
      'Additional Rules',
      `Bounties will be checked manually.

      Be patient, when waiting for our response.

      Bounty payment decisions are final.

      Additional Dirsh won't be created after airdrop ends.

      USA and UK citizens cannot participate due to regulations.

      You are responsible for following the regulations in your current locale.

      We reserve a right to end a specific bounty program sooner, if new regulations, laws or other rules force us to do so.
      
      If a bounty program is stopped before the airdrop is finished, the remaining tokens are moved to the airdrop account.

      Value of each remaining airdrop gift card is raised to distribute all the tokens evenly.

      Transaction fees are not charged for airdrop or bounties.
      `,
      'info'
    ],
  ];
}
