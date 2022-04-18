import { Component } from '@angular/core';
import { Charts, ChartType } from './demo4.interface';

@Component({
  selector: 'app-demo4',
  templateUrl: './demo4.component.html',
  styleUrls: ['./demo4.component.scss'],
})
export class Demo4Component {
  charts = Charts;
  chartName = '尚未选择';

  select(chartType: ChartType): void {
    if (chartType === 'line') {
      this.chartName = '折线图';
    } else if (chartType === 'pie') {
      this.chartName = '饼图';
    } else if (chartType === 'radar') {
      this.chartName = '雷达图';
    }
  }
}
