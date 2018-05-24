import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import {FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({selector: 'contact', templateUrl: './contact.component.html', styleUrls: ['./contact.component.scss']})
export class ContactComponent {

  emailCtrl : FormControl;
  topicCtrl : FormControl;
  contentCtrl : FormControl;
  checked:boolean=false;
  public formModel:{
    captcha?: string
  }={};

  constructor(private mDialog:MatDialog,private router: Router) {
    this.emailCtrl = new FormControl('', Validators.email);
    this.topicCtrl = new FormControl('', Validators.required);
    this.contentCtrl = new FormControl('', Validators.required);
  }
  
  send() {
    if(!this.emailCtrl.valid&&this.emailCtrl.value&&this.emailCtrl.value.length==0){
      this.dialog('Invalid email.');
    }else if(!this.topicCtrl.valid){
      this.dialog('Topic required.');
    }else if(!this.contentCtrl.valid){
      this.dialog('Content required.');
    }else if(!this.formModel.captcha){
      this.dialog('Invalid reCAPTCHA.');
    }else{
      let address='https://dirshwebsite.firebaseapp.com/checkRecaptcha?type=contact'
      +'&t='+this.topicCtrl.value
      +'&c='+this.contentCtrl.value
      +'&recaptcha=' + encodeURIComponent(this.formModel.captcha);
      if(this.emailCtrl.value){
        address+='&e='+this.emailCtrl.value
      }
      window.location.href=address;
    }
  }
  
  dialog(message:string){
    this.mDialog.open(DialogComponent, {
      data: { topic: 'Sending Failed', content: message},
      panelClass: 'mat-dialog-style'
    });
  }

  readPrivacyPolicy(){
    this.router.navigate(['','privacy-policy']);
  }
}
