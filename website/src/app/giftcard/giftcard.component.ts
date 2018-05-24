import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-giftcard',
  templateUrl: './giftcard.component.html',
  styleUrls: ['./giftcard.component.scss']
})
export class GiftcardComponent {

  id:string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.id)
      .subscribe(params => {
        console.log(params); // {order: "popular"}

        if(params.id){
          this.id = params.id;
          console.log('Gift card id: '+this.id); // popular
        }
      });
  }
  
}
