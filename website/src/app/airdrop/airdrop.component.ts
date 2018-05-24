import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'airdrop',
  templateUrl: './airdrop.component.html',
  styleUrls: ['./airdrop.component.scss']
})

export class AirdropComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  password:string;

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.p)
      .subscribe(params => {
        if(params.p){
          this.password = params.p;
          console.log('Gift password is: '+this.password);
        }
      });
  }

  submit(response:any){
    window.location.href = 'https://dirsh-d6d60.firebaseapp.com/checkRecaptcha?type=airdrop'
      +'&p='+this.password
      +'&recaptcha=' + encodeURIComponent(response);
  }
}