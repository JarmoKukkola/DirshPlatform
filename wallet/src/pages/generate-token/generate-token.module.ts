import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenerateTokenPage } from './generate-token';

@NgModule({
  declarations: [
    GenerateTokenPage,
  ],
  imports: [
    IonicPageModule.forChild(GenerateTokenPage),
  ],
})
export class GenerateTokenPageModule {}
