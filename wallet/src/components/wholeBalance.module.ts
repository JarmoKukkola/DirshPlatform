import { NgModule } from '@angular/core';
import { WholeBalanceComponent } from './whole-balance/whole-balance';
import { IonicPageModule } from 'ionic-angular';
@NgModule({
	declarations: [WholeBalanceComponent],
	imports: [IonicPageModule.forChild(WholeBalanceComponent)],
	exports: [WholeBalanceComponent]
})
export class WholeBalanceModule {}
