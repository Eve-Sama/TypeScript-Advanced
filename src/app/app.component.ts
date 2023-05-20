import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cards = [
    {
      title: '字段录入',
      url: '/demo1',
    },
    {
      title: '公民信息登记',
      url: '/demo2',
    },
    {
      title: 'as const',
      url: '/demo3',
    },
    {
      title: '复杂场景',
      url: '/demo4',
    },
    {
      title: 'is',
      url: '/demo5',
    },
    {
      title: 'form',
      url: '/demo6',
    },
  ];
}
