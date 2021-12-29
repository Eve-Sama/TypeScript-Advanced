import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cards = [
    {
      title: '复用代码',
      url: '/demo1',
    },
    {
      title: '复用代码2',
      url: '/demo2',
    },
  ];
}
