import { Component } from '@angular/core';
import { Charts } from './demo3.interface';

@Component({
  selector: 'app-demo3',
  templateUrl: './demo3.component.html',
  styleUrls: ['./demo3.component.scss'],
})
export class Demo3Component {
  charts = Charts;
  chartName = '尚未选择';

  select(chartType: string): void {
    if (chartType === 'line') {
      this.chartName = '折线图';
    } else if (chartType === 'pie') {
      this.chartName = '饼图';
    } else if (chartType === 'radar') {
      this.chartName = '雷达图';
    }
  }
}
