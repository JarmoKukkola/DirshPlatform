import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  constructor(private router: Router){

  }

  navigate(path:string){
    this.router.navigate(['',path]);
  }

  items = [
    [
      `Licenses
      `,
      'announcement',
      () => {
        this.navigate('licenses');
      }
    ],
    [
      `Privacy Policy
      `,
      'visibility',
      () => {
        this.navigate('privacy-policy');
      }
    ],
    [
      `Terms of Service
      `,
      'description',
      () => {
        this.navigate('terms-of-service');
      }
    ]
  ];

}
