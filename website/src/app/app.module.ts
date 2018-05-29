import { BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { ShadowComponent } from './shadow/shadow.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatButtonModule, MatFormFieldModule, MatTabsModule, MatInputModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatMenuModule, MatSnackBarModule} from '@angular/material';
import { KeySpecsComponent } from './key-specs/key-specs.component';
import { ContactComponent } from './contact/contact.component';
import { Routes,RouterModule } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { MessageSendComponent } from './message-send/message-send.component';
import { FeaturesComponent } from './features/features.component';
import { DistributionComponent } from './distribution/distribution.component';
import { LicensesComponent } from './licenses/licenses.component';
import { SlickComponent } from './slick/slick.component';
import { SlickItemDirective } from './slick-item.directive';
import { CarouselComponent } from './carousel/carousel.component';
import { WalletComponent } from './wallet/wallet.component';
import { GiftcardComponent } from './giftcard/giftcard.component';
import { GiftcardUsedComponent } from './giftcard-used/giftcard-used.component';
import { NgxQRCodeComponent } from './ngxqrcode/NgxQRCodeComponent ';
import { AirdropComponent } from './airdrop/airdrop.component';
import { MessageFailedComponent } from './message-failed/message-failed.component';
import { InfoComponent } from './info/info.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { HelpComponent } from './help/help.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PrivacyPolicyDialogComponent } from './privacy-policy-dialog/privacy-policy-dialog.component';
import { TermsOfServiceDialogComponent } from './terms-of-service-dialog/terms-of-service-dialog.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'distribution', component: DistributionComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'info', component: InfoComponent },
  { path: 'help', component: HelpComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: 'licenses', component: LicensesComponent },
  { path: 'giftcard', component: GiftcardComponent },
  { path: 'giftcard-used', component: GiftcardUsedComponent },
  { path: 'airdrop', component: AirdropComponent },
  { path: 'message-send', component: MessageSendComponent },
  { path: 'message-failed', component: MessageFailedComponent }
];

@NgModule({
  declarations: [
    NgxQRCodeComponent,
    AppComponent,
    ShadowComponent,
    DialogComponent,
    KeySpecsComponent,
    ContactComponent,
    TeamComponent,
    HomeComponent,
    MessageSendComponent,
    FeaturesComponent,
    DistributionComponent,
    LicensesComponent,
    SlickComponent,
    SlickItemDirective,
    CarouselComponent,
    WalletComponent,
    GiftcardComponent,
    GiftcardUsedComponent,
    AirdropComponent,
    MessageFailedComponent,
    InfoComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    HelpComponent,
    PrivacyPolicyDialogComponent,
    TermsOfServiceDialogComponent
  ],
  imports: [
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatDialogModule,
    NoopAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatFormFieldModule,
    // MatSelectModule,
    // BrowserAnimationsModule,
    HttpClientModule
  ],
  entryComponents: [DialogComponent, PrivacyPolicyDialogComponent, TermsOfServiceDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
