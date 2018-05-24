import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReceivedPage } from './received';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ReceivedPage,
  ],
  imports: [
    IonicPageModule.forChild(ReceivedPage),
    TranslateModule.forChild()
  ],
  providers:[
    FirebaseProvider
  ]
})
export class ReceivedPageModule {}
