import { Component, ViewChild,Input,HostListener,ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @ViewChild('widgetParentDiv')parentDiv : ElementRef;
  @HostListener('window:resize')onResize() {
    this.testMobile();
  }

  ngOnInit() {
    this.testMobile();
  }

  mobile:boolean=true;

  testMobile() {
    this.mobile = Boolean(window.innerWidth < 1220);
  }

  @Input() items:any;
  @Input() topic:string;
}
