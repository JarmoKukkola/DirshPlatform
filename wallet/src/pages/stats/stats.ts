import { Component, NgZone } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FirebaseProvider } from "../../providers/firebase/firebase";

@IonicPage()
@Component({
  selector: "page-stats",
  templateUrl: "stats.html"
})
export class StatsPage {
  burnedDirsh: string = null;
  tokenTypes: string = null;
  airdropRound: string = null;
  airdropBalance: string = null;
  articleBalance: string = null;
  communityBalance: string = null;
  openSourceBalance: string = null;
  youtubeBalance: string = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseProvider: FirebaseProvider,
    private ngZone: NgZone
  ) {}

  ionViewDidLoad() {
    let that = this;
    this.firebaseProvider
      .getBurnedStatsRef()
      .once("value")
      .then(function(snapshot) {
        that.ngZone.run(() => {
          that.burnedDirsh = snapshot.val().totalBurned + " Dirsh";
          that.tokenTypes = snapshot.val().numberOfTokenTypes;
        });
      });

    this.firebaseProvider
      .getDistributionPublicRef()
      .once("value")
      .then(function(snapshot) {
        that.ngZone.run(() => {
          that.airdropRound = snapshot.val().airdrop.index + "/144000";
          that.airdropBalance = snapshot.val().airdrop.balance + " Dirsh";
          that.articleBalance = snapshot.val().article + " Dirsh";
          that.youtubeBalance = snapshot.val().youtube + " Dirsh";
          that.openSourceBalance = snapshot.val().openSource + " Dirsh";
          that.communityBalance = snapshot.val().community + " Dirsh";
        });
      });
  }
}
