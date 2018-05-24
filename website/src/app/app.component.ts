import {
  NgZone,
  Component,
  ViewEncapsulation,
  HostListener,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.scss'], encapsulation: ViewEncapsulation.None})
export class AppComponent implements OnInit{
  title = 'app';
  myStorage = window.localStorage;
  primaryDark = "#095fa5";
  primary = "#90CAF9";

  selectedIndex = 0;

  @ViewChild('widgetParentDiv')parentDiv : ElementRef;
  @HostListener('window:resize')onResize() {
    this.testMobile();
  }

  testMobile() {
    this.mobileSize = Boolean(window.innerWidth < 1005);
  }

  mobileSize : boolean = true;

  constructor(public mDialog : MatDialog, private ngZone : NgZone) {}

  ngOnInit(){
    this.testMobile();
  }

  ngAfterViewInit() {
    this.addButtons();
  }

  menuButtons = [];

  addButtons() {
    this
      .menuButtons
      .push(['Home', '/']);
    this
      .menuButtons
      .push(['Features', '/features']);
    this
      .menuButtons
      .push(['Distribution', '/distribution']);
    this
      .menuButtons
      .push(['Wallet', '/wallet']);
    this
      .menuButtons
      .push(['Team', '/team']);
    this
      .menuButtons
      .push(['Contact', '/contact']);
    this
      .menuButtons
      .push(['Info', '/info']);
  }
}
