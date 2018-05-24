import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OverviewPage } from './overview';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(OverviewPage),
    TranslateModule.forChild()
  ],
  providers:[
    FirebaseProvider
  ]
})
export class OverviewPageModule {}
