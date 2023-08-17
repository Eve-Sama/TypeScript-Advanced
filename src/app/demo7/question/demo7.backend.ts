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
      if (level > 3) {
        subscriber.error('已满级, 无法再升级!');
      }
      const success = this._getResultByRate(map.rate);
      subscriber.next(success);
    });
    return observable;
  }

  /** 根据概率, 计算当前成功的可能值 */
  private _getResultByRate(rate: number): boolean {
    return Math.random() <= rate;
  }
  // try {
  //   subscriber.next(2);
  //   subscriber.next(3);
  //   subscriber.complete();
  // } catch (err) {
  //   subscriber.error(err); // delivers an error if it caught one
  // }
}
