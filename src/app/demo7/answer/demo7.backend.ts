import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from './demo7.interface';

@Injectable()
export class BackendService {
  map = map;
  constructor() {}

  levelUp(level: number): Observable<boolean> {
    const map = this.map.get(level);
    const observable = new Observable<boolean>(subscriber => {
      setTimeout(() => {
        if (level > 14) {
          subscriber.error('已满级, 无法再升级!');
        }
        const success = this._getResultByRate(map.rate);
        subscriber.next(success);
      }, 1000);
    });
    return observable;
  }

  /** 根据概率, 计算当前成功的可能值 */
  private _getResultByRate(rate: number): boolean {
    return Math.random() <= rate;
  }
}
