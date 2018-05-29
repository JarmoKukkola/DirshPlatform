import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
import { PrivacyPolicyDialogComponent } from '../privacy-policy-dialog/privacy-policy-dialog.component';
import { TermsOfServiceComponent } from '../terms-of-service/terms-of-service.component';
import { TermsOfServiceDialogComponent } from '../terms-of-service-dialog/terms-of-service-dialog.component';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContactComponent {

  accepted:boolean=false;
  emailCtrl: FormControl;
  topicCtrl: FormControl;
  contentCtrl: FormControl;
  checked: boolean = false;
  public formModel: {
    captcha?: string
  } = {};

  constructor(private mDialog: MatDialog, private router: Router) {
    this.emailCtrl = new FormControl('', Validators.email);
    this.topicCtrl = new FormControl('', Validators.required);
    this.contentCtrl = new FormControl('', Validators.required);
  }

  send() {
    if (!this.emailCtrl.valid && this.emailCtrl.value && this.emailCtrl.value.length == 0) {
      this.dialog('Invalid email.');
    } else if (!this.topicCtrl.valid) {
      this.dialog('Topic required.');
    } else if (!this.contentCtrl.valid) {
      this.dialog('Content required.');
    } else if (!this.formModel.captcha) {
      this.dialog('Invalid reCAPTCHA.');
    } else {
      let address = 'https://dirshwebsite.firebaseapp.com/checkRecaptcha?type=contact'
        + '&t=' + this.topicCtrl.value
        + '&c=' + this.contentCtrl.value
        + '&recaptcha=' + encodeURIComponent(this.formModel.captcha);
      if (this.emailCtrl.value) {
        address += '&e=' + this.emailCtrl.value
      }
      window.location.href = address;
    }
  }

  dialog(message: string) {
    this.mDialog.open(DialogComponent, {
      data: { topic: 'Sending Failed', content: message },
      panelClass: 'mat-dialog-style'
    });
  }

  readPrivacyPolicy() {
    let that=this;
    let dialogRef = that.openDialog(PrivacyPolicyDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        let dialogRef = that.openDialog(TermsOfServiceDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          if(result===true){
            that.accepted=true; 
          }
        });
      }
    });

  }

  openDialog(componentType: any): any {
    return this.mDialog.open(componentType, {
      autoFocus: false,
      width: '90vh',
      height: '90vh',
      maxWidth: '90vh',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container'
    });
  }
}
