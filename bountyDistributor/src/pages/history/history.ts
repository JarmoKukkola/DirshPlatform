import { Component, NgZone } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FirebaseProvider } from "../../providers/firebase/firebase";

@IonicPage()
@Component({
  selector: "page-history",
  templateUrl: "history.html"
})
export class HistoryPage {
  items = [];

  constructor(
    private firebaseProvider: FirebaseProvider,
    private ngZone: NgZone
  ) {}

  setItem(data: any) {
    const val = data.val();
    this.ngZone.run(() => {
      this.items.push( {
        amount: val.amount,
        time: val.time,
        receiver: val.receiverAddress
      });
      // const temp=[];
      // for (let item of this.items){
        // temp.push(item);
      // }
    });
  }

  ionViewDidLoad() {
    const that = this;
    const historyRef = this.firebaseProvider.getBountySentRef();
    historyRef.on("child_added", function(data) {
      console.log(
        "child_added. Key: " + data.key + " - " + JSON.stringify(data.val())
      );
      that.setItem(data);
    });

    historyRef.on("child_changed", function(data) {
      console.log(
        "child_changed. Key: " + data.key + " - " + JSON.stringify(data.val())
      );
      that.setItem(data);
    });

    historyRef.on("child_removed", function(data) {
      console.log(
        "child_removed. Key: " + data.key + " - " + JSON.stringify(data.val())
      );
      delete that.items[data.key];
    });
  }
}
