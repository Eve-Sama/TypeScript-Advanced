import { Component } from '@angular/core';
import { BackendService } from './demo7.backend';
import { StoreService } from './demo7.store';

@Component({
  selector: 'app-demo7',
  templateUrl: './demo7.component.html',
  styleUrls: ['./demo7.component.scss'],
  providers: [BackendService, StoreService],
})
export class Demo7Component {
  isSpinning$ = this.store.isSpinning$;
  blockInfo$ = this.store.blockInfo$;
  moneyInfo$ = this.store.moneyInfo$;
  upInfo$ = this.store.upInfo$;
  payInfo$ = this.store.payInfo$;
  level$ = this.store.level$;
  rate$ = this.store.rate$;
  needBlock$ = this.store.needBlock$;
  needMoney$ = this.store.needMoney$;
  beforeBlock$ = this.store.beforeBlock$;
  beforeMoney$ = this.store.beforeMoney$;

  getBlock(): void {
    this.store.getBlock();
  }

  getMoney(): void {
    this.store.getMoney();
  }

  pay(): void {
    this.store.pay();
  }

  up(): void {
    this.store.up();
  }

  constructor(private store: StoreService) {}
}
