import { Component, OnInit } from '@angular/core';
import { map } from './demo7.interface';
import { BackendService } from './demo7.backend';

@Component({
  selector: 'app-demo7',
  templateUrl: './demo7.component.html',
  styleUrls: ['./demo7.component.scss'],
  providers: [BackendService],
})
export class Demo7Component implements OnInit {
  isSpinning = false;
  /** 当前强化等级 */
  level = 0;
  upInfo = {
    state: '等待强化',
    times: 0,
    rate: 0,
  };
  /** 无色小晶块 */
  blockInfo = {
    /** 背包中拥有的数量 */
    current: 15,
    /** 在增加之前的数量 */
    before: 0,
    /** 强化装备所需数量 */
    need: 0,
    addNum: 0,
    timer: null,
    startAddAnimation: false,
  };
  /** 金币 */
  moneyInfo = {
    /** 背包中拥有的数量 */
    current: 0,
    /** 在增加之前的数量 */
    before: 0,
    /** 强化装备所需数量 */
    need: 0,
    addNum: 0,
    timer: null,
    startAddAnimation: false,
  };
  payInfo = {
    /** 拥有获取材料的次数 */
    count: 0,
    /** 已消费的流币 */
    consumeLiuBi: 0,
  };

  getBlock(): void {
    if (this.payInfo.count === 0) {
      alert('剩余次数不足, 请充值!');
      return;
    }
    this.payInfo.count--;
    this.blockInfo.addNum = this._getRandom(70, 160);
    this.blockInfo.before = this.blockInfo.current;
    this.blockInfo.current += this.blockInfo.addNum;
    this.blockInfo.startAddAnimation = true;
    clearTimeout(this.blockInfo.timer);
    this.blockInfo.timer = setTimeout(() => {
      this.blockInfo.startAddAnimation = false;
    }, 2000);
  }

  getMoney(): void {
    if (this.payInfo.count === 0) {
      alert('剩余次数不足, 请充值!');
      return;
    }
    this.payInfo.count--;
    this.moneyInfo.addNum = this._getRandom(1000000, 5000000);
    this.moneyInfo.before = this.moneyInfo.current;
    this.moneyInfo.current += this.moneyInfo.addNum;
    this.moneyInfo.startAddAnimation = true;
    clearTimeout(this.moneyInfo.timer);
    this.moneyInfo.timer = setTimeout(() => {
      this.moneyInfo.startAddAnimation = false;
    }, 2000);
  }

  pay(): void {
    const value = confirm('是否需要消耗 1 流币获取 10 次机会?');
    if (value) {
      this.payInfo.count += 10;
      this.payInfo.consumeLiuBi++;
    }
  }

  up(): void {
    if (this.blockInfo.need > this.blockInfo.current) {
      alert('无色小晶块数量不足!');
      return;
    }
    if (this.moneyInfo.need > this.moneyInfo.current) {
      alert('金币数量不足!');
      return;
    }
    this.isSpinning = true;
    this.backendService.levelUp(this.level).subscribe(
      v => {
        if (v) {
          this.upInfo.state = '强化成功';
          this.level++;
          this._upSuccess();
        } else {
          this.upInfo.state = '强化失败';
        }
        this.upInfo.times++;
        this.blockInfo.current -= this.blockInfo.need;
        this.moneyInfo.current -= this.moneyInfo.need;
        this.isSpinning = false;
      },
      error => {
        this.isSpinning = false;
        alert(error);
      }
    );
  }

  private _upSuccess(): void {
    const upData = map.get(this.level);
    if (upData) {
      this.upInfo.rate = upData.rate;
      this.blockInfo.need = upData.block;
      this.moneyInfo.need = upData.money;
    }
  }

  private _getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this._upSuccess();
  }
}
