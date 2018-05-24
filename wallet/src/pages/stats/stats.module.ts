import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatsPage } from './stats';

@NgModule({
  declarations: [
    StatsPage,
  ],
  imports: [
    IonicPageModule.forChild(StatsPage),
  ],
})
export class StatsPageModule {}
