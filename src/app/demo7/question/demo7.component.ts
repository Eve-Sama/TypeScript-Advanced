import { Component, OnInit } from '@angular/core';
import { map } from './demo7.interface';

@Component({
  selector: 'app-demo7',
  templateUrl: './demo7.component.html',
  styleUrls: ['./demo7.component.scss'],
})
export class Demo7Component implements OnInit {
  /** 当前已消耗的流币 */
  usedLiuBi = 0;
  /** 当前强化等级 */
  level = 0;
  upInfo = {
    state: '等待强化',
    times: 0,
    rate: 0.9,
  };
  /** 物色小晶块 */
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
    current: 400000,
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
      const value = confirm('是否需要消耗 1 流币获取 10 次机会?');
      if (value) {
        this.payInfo.count += 10;
        this.payInfo.consumeLiuBi++;
      }
      return
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
      const value = confirm('是否需要消耗 1 流币获取 10 次机会?');
      if (value) {
        this.payInfo.count += 10;
        this.payInfo.consumeLiuBi++;
      }
      return
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

  /** 检查用户是否有获取材料的次数 */
  private _canGet(): boolean {
    return !(this.payInfo.count === 0);
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
    this.upInfo.times++;
    this.blockInfo.current -= this.blockInfo.need;
    this.moneyInfo.current -= this.moneyInfo.need;
    if (this._getRate(this.upInfo.rate)) {
      this.upInfo.state = '强化成功';
      this.level++;
      if (this.level < 15) {
        this._upSuccess();
      }
    } else {
      this.upInfo.state = '强化失败';
    }
  }

  private _upSuccess(): void {
    const upData = map.get(this.level);
    this.upInfo.rate = upData.rate;
    this.blockInfo.need = upData.block;
    this.moneyInfo.need = upData.money;
  }

  /** 根据概率, 计算当前成功的可能值 */
  private _getRate(rate: number): boolean {
    return Math.random() <= rate;
  }

  private _getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }

  ngOnInit(): void {
    this._upSuccess();
  }
}
