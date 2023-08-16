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
    current: 0,
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

  getBlock(): void {
    this.blockInfo.addNum = Math.floor(Math.random() * 50) + 1;
    this.blockInfo.before = this.blockInfo.current;
    this.blockInfo.current += this.blockInfo.addNum;
    this.blockInfo.startAddAnimation = true;
    clearTimeout(this.blockInfo.timer);
    this.blockInfo.timer = setTimeout(() => {
      this.blockInfo.startAddAnimation = false;
    }, 2000);
  }

  getMoney(): void {
    this.moneyInfo.addNum = Math.floor(Math.random() * 100000) + 10000;
    this.moneyInfo.before = this.moneyInfo.current;
    this.moneyInfo.current += this.moneyInfo.addNum;
    this.moneyInfo.startAddAnimation = true;
    clearTimeout(this.moneyInfo.timer);
    this.moneyInfo.timer = setTimeout(() => {
      this.moneyInfo.startAddAnimation = false;
    }, 2000);
  }

  up(): void {
    const upData = map.get(this.level);
    if (this._getRate(upData.rate)) {
      this.upInfo.state = '强化成功';
      this.level++;
      if(this.level < 15) {
        this._upSuccess();
      }
    } else {
      this.upInfo.state = '强化失败';
    }
    this.upInfo.times++;
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

  ngOnInit(): void {
    this._upSuccess();
  }
}
