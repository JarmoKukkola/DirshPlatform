import { Component, ViewChild,Input,HostListener,ElementRef, OnInit } from '@angular/core';
import { SlickComponent } from '../slick/slick.component';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @ViewChild(SlickComponent) slick:SlickComponent;

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
  @Input() popup:boolean=false;

  selectedSlide=0;

  slideConfig = {
    "waitForAnimate":false,
    "arrows":false,
    "adaptiveHeight":true,
    "accessibility":false,
    "easing":'easeInOutSine',
  };
  
  chooseSlide(i) {
    if(!this.popup&&!this.mobile){
      this.selectedSlide=i;
      this.slick.slickGoTo(i);
    }
  }
}
