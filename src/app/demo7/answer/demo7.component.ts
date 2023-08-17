import { Component, OnInit } from '@angular/core';
import { map } from './demo7.interface';
import { BackendService } from './demo7.backend';
import { StoreService } from './demo7.store';

@Component({
  selector: 'app-demo7',
  templateUrl: './demo7.component.html',
  styleUrls: ['./demo7.component.scss'],
  providers: [BackendService, StoreService],
})
export class Demo7Component implements OnInit {
  isSpinning$ = this.store.isSpinning$;
  blockInfo$ = this.store.blockInfo$;
  moneyInfo$ = this.store.moneyInfo$;
  upInfo$ = this.store.upInfo$;
  payInfo$ = this.store.payInfo$;
  level$ = this.store.level$;

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

  constructor(private backendService: BackendService, private store: StoreService) {}

  ngOnInit(): void {
    // this._upSuccess();
  }
}
