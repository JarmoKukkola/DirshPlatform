import {
  Directive, ElementRef, Host
} from '@angular/core';
import { SlickComponent } from './slick/slick.component';

@Directive({
  selector: '[ngxSlickItem]'
})
export class SlickItemDirective {

  constructor(public el: ElementRef, @Host() private carousel: SlickComponent) {
  }

  ngAfterViewInit() {
      this.carousel.addSlide(this);
  }

  ngOnDestroy() {
      this.carousel.removeSlide(this);
  }
}
