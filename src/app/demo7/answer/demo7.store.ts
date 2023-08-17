import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, of, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { map } from './demo7.interface';
import { BackendService } from './demo7.backend';

interface State {
  isSpinning: boolean;
  level: number;
  upInfo: {
    state: '等待强化' | '强化成功' | '强化失败';
    times: number;
  };
  /** 无色小晶块 */
  blockInfo: {
    /** 背包中拥有的数量 */
    current: number;
    addNum: number;
    timer: any;
    startAddAnimation: boolean;
  };
  /** 金币 */
  moneyInfo: {
    /** 背包中拥有的数量 */
    current: number;
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
export class StoreService extends ComponentStore<State> {
  blockInfo$ = this.select(state => state.blockInfo);
  level$ = this.select(state => state.level);
  moneyInfo$ = this.select(state => state.moneyInfo);
  isSpinning$ = this.select(state => state.isSpinning);
  upInfo$ = this.select(state => state.upInfo);
  payInfo$ = this.select(state => state.payInfo);
  rate$ = this.select(state => {
    const { level } = state;
    const data = map.get(level);
    return data.rate;
  });
  needBlock$ = this.select(state => {
    const { level } = state;
    const data = map.get(level);
    return data.block;
  });
  needMoney$ = this.select(state => {
    const { level } = state;
    const data = map.get(level);
    return data.money;
  });
  beforeBlock$ = this.select(state => {
    const { blockInfo } = state;
    return blockInfo.current - blockInfo.addNum;
  });
  beforeMoney$ = this.select(state => {
    const { moneyInfo } = state;
    return moneyInfo.current - moneyInfo.addNum;
  });

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
        moneyInfo.addNum = this._getRandom(1000000, 5000000);
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
      withLatestFrom(this.blockInfo$, this.needBlock$, this.needMoney$, this.upInfo$, this.moneyInfo$, this.level$),
      switchMap(([_, blockInfo, needBlock, needMoney, upInfo, moneyInfo, level]) => {
        let execute = true;
        if (needBlock > blockInfo.current) {
          alert('无色小晶块数量不足!');
          execute = false;
          return of({ execute, level, upInfo, blockInfo, moneyInfo, needBlock, needMoney });
        } else if (needMoney > moneyInfo.current) {
          alert('金币数量不足!');
          execute = false;
          return of({ execute, level, upInfo, blockInfo, moneyInfo, needBlock, needMoney });
        }
        return of({ execute, level, upInfo, blockInfo, moneyInfo, needBlock, needMoney });
      }),
      switchMap(data => {
        let { execute, level, upInfo, blockInfo, moneyInfo, needBlock, needMoney } = data;
        if (execute) {
          this.loading(true);
          return this.backendService.levelUp(level).pipe(
            tapResponse(
              result => {
                if (result) {
                  level++;
                  upInfo.state = '强化成功';
                } else {
                  upInfo.state = '强化失败';
                }
                upInfo.times++;
                blockInfo.current -= needBlock;
                moneyInfo.current -= needMoney;
                this.loading(false);
                this.patchState({ blockInfo, upInfo, moneyInfo, level });
              },
              error => {
                this.loading(false);
                alert(error);
              }
            )
          );
        }
        return of(true);
      })
    );
    return res;
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
      },
      blockInfo: {
        /** 背包中拥有的数量 */
        current: 0,
        /** 在增加之前的数量 */
        addNum: 0,
        timer: null,
        startAddAnimation: false,
      },
      moneyInfo: {
        /** 背包中拥有的数量 */
        current: 0,
        /** 在增加之前的数量 */
        addNum: 0,
        timer: null,
        startAddAnimation: false,
      },
      payInfo: {
        count: 0,
        consumeLiuBi: 0,
      },
    });
  }
}
