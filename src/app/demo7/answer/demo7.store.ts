import { Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { Observable, take, tap, withLatestFrom } from 'rxjs';
import { map } from './demo7.interface';
import { BackendService } from './demo7.backend';

interface State {
  isSpinning: boolean;
  level: number;
  upInfo: {
    state: '等待强化' | '强化成功' | '强化失败';
    times: number;
    rate: number;
  };
  /** 无色小晶块 */
  blockInfo: {
    /** 背包中拥有的数量 */
    current: number;
    /** 在增加之前的数量 */
    before: number;
    /** 强化装备所需数量 */
    need: number;
    addNum: number;
    timer: any;
    startAddAnimation: boolean;
  };
  /** 金币 */
  moneyInfo: {
    /** 背包中拥有的数量 */
    current: number;
    /** 在增加之前的数量 */
    before: number;
    /** 强化装备所需数量 */
    need: number;
    addNum: number;
    timer: any;
    startAddAnimation: boolean;
  };
  payInfo: {
    /** 拥有获取材料的次数 */
    count: number;
    /** 已消费的流币 */
    consumeLiuBi: number;
  };
}

@Injectable()
export class StoreService extends ComponentStore<State> implements OnStoreInit {
  blockInfo$ = this.select(state => state.blockInfo);
  level$ = this.select(state => state.level);
  moneyInfo$ = this.select(state => state.moneyInfo);
  isSpinning$ = this.select(state => state.isSpinning);
  upInfo$ = this.select(state => state.upInfo);
  payInfo$ = this.select(state => state.payInfo);

  getBlock = this.effect(($: Observable<void>) => {
    const res = $.pipe(
      withLatestFrom(this.blockInfo$, this.payInfo$),
      tap(([_, blockInfo, payInfo]) => {
        if (payInfo.count === 0) {
          alert('剩余次数不足, 请充值!');
          return;
        }
        payInfo.count--;
        blockInfo.addNum = this._getRandom(70, 160);
        blockInfo.before = blockInfo.current;
        blockInfo.current += blockInfo.addNum;
        blockInfo.startAddAnimation = true;
        clearTimeout(blockInfo.timer);
        this.patchState({ blockInfo, payInfo });
        blockInfo.timer = setTimeout(() => {
          blockInfo.startAddAnimation = false;
          this.patchState({ blockInfo });
        }, 2000);
      })
    );
    return res;
  });

  getMoney = this.effect(($: Observable<void>) => {
    const res = $.pipe(
      withLatestFrom(this.moneyInfo$, this.payInfo$),
      tap(([_, moneyInfo, payInfo]) => {
        if (payInfo.count === 0) {
          alert('剩余次数不足, 请充值!');
          return;
        }
        payInfo.count--;
        moneyInfo.addNum = this._getRandom(1000000, 10000000);
        moneyInfo.before = moneyInfo.current;
        moneyInfo.current += moneyInfo.addNum;
        moneyInfo.startAddAnimation = true;
        clearTimeout(moneyInfo.timer);
        this.patchState({ moneyInfo, payInfo });
        moneyInfo.timer = setTimeout(() => {
          moneyInfo.startAddAnimation = false;
          this.patchState({ moneyInfo });
        }, 2000);
      })
    );
    return res;
  });

  pay = this.effect(($: Observable<void>) => {
    const res = $.pipe(
      withLatestFrom(this.payInfo$),
      tap(([_, payInfo]) => {
        const value = confirm('是否需要消耗 1 流币获取 10 次机会?');
        if (value) {
          payInfo.count += 10;
          payInfo.consumeLiuBi++;
          this.patchState({ payInfo });
        }
      })
    );
    return res;
  });

  loading = this.updater((state, isSpinning: boolean) => {
    return { ...state, isSpinning };
  });

  up = this.effect(($: Observable<void>) => {
    const res = $.pipe(
      withLatestFrom(this.blockInfo$, this.upInfo$, this.moneyInfo$, this.level$),
      tap(([_, blockInfo, upInfo, moneyInfo, level]) => {
        if (blockInfo.need > blockInfo.current) {
          alert('无色小晶块数量不足!');
          return;
        }
        if (moneyInfo.need > moneyInfo.current) {
          alert('金币数量不足!');
          return;
        }
        this.loading(true);
        this.backendService.levelUp(level).subscribe(
          v => {
            if (v) {
              upInfo.state = '强化成功';
              level++;
              this._upSuccess();
            } else {
              upInfo.state = '强化失败';
            }
            upInfo.times++;
            blockInfo.current -= blockInfo.need;
            moneyInfo.current -= moneyInfo.need;
            this.loading(false);
            this.patchState({ blockInfo, upInfo, moneyInfo, level });
          },
          error => {
            this.loading(false);
            alert(error);
          }
        );
      })
    );
    return res;
  });

  private _upSuccess = this.updater(state => {
    const { level, upInfo, blockInfo, moneyInfo } = state;
    const upData = map.get(level);

    if (upData) {
      upInfo.rate = upData.rate;
      blockInfo.need = upData.block;
      moneyInfo.need = upData.money;
    }
    return { ...state, upInfo, blockInfo, moneyInfo };
  });

  getState<T>(state: Observable<T>): T {
    let value: T;
    state.pipe(take(1)).subscribe(v => (value = v));
    return value;
  }

  private _getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }

  constructor(private backendService: BackendService) {
    super({
      isSpinning: false,
      level: 0,
      upInfo: {
        state: '等待强化',
        times: 0,
        rate: 1,
      },
      blockInfo: {
        /** 背包中拥有的数量 */
        current: 0,
        /** 在增加之前的数量 */
        before: 0,
        /** 强化装备所需数量 */
        need: 0,
        addNum: 0,
        timer: null,
        startAddAnimation: false,
      },
      moneyInfo: {
        /** 背包中拥有的数量 */
        current: 0,
        /** 在增加之前的数量 */
        before: 0,
        /** 强化装备所需数量 */
        need: 0,
        addNum: 0,
        timer: null,
        startAddAnimation: false,
      },
      payInfo: {
        count: 0,
        consumeLiuBi: 0,
      },
    });
    this._upSuccess();
  }

  ngrxOnStoreInit() {
    console.log('dssdvsdsdva1');
    this._upSuccess();
  }
}
