import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SentPage } from './sent';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SentPage,
  ],
  imports: [
    IonicPageModule.forChild(SentPage),
    TranslateModule.forChild()
  ],
  providers:[
    FirebaseProvider
  ]
})
export class SentPageModule {}
