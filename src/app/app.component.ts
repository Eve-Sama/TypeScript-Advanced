import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cards = [
    {
      title: 'Demo1',
      url: '/demo1',
    },
    {
      title: 'Demo2',
      url: '/demo2',
    },
  ];
}
