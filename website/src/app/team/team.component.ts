import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  items=[
    [
    `Jarmo Kukkola
    
    Founder
    `,
    `Doctor of technology

    Full-stack developer (app, web, desktop, server)
    
    Typescript, HTML, SCSS, Java, C#, Javascript, Node.js

    Android SDK, Angular, Ionic, cloud technologies, Electron

    Vector and pixel graphics
    `,
    null,
    'assets/jarmo.png',
    "https://github.com/JarmoKukkola"
    ]
  ];
}
