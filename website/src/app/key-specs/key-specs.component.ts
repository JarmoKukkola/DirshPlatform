import { Component, OnInit,Input,ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'key-specs',
  templateUrl: './key-specs.component.html',
  styleUrls: ['./key-specs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KeySpecsComponent {

  @Input() name:string;
  @Input() message:string;
  @Input() icon:string;
  @Input() photo:string;
  @Input() github:string;

  constructor(private mDialog:MatDialog) { }

  dialog(){
      this.mDialog.open(DialogComponent, {
        data: { topic: this.name, content: this.message },
        panelClass: 'mat-dialog-style'
      });
  }
}
