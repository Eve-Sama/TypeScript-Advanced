import { ChangeDetectorRef, Component } from '@angular/core';
import { Bar, Line, Pie, Radar } from '@antv/g2plot';
import { ChartType } from './demo4.interface';
import { getG2Config } from './g2-render-engine';

@Component({
  selector: 'app-demo4',
  templateUrl: './demo4.component.html',
  styleUrls: ['./demo4.component.scss'],
})
export class Demo4Component {
  charts: ChartType[] = ['pie', 'line', 'radar', 'bar'];
  chartName = '尚未选择';
  show = false;

  select(chartType: ChartType): void {
    this.show = false;
    this.cdr.detectChanges();
    this.show = true;
    this.cdr.detectChanges();
    let plot: Line | Pie | Radar | Bar;
    if (chartType === 'line') {
      this.chartName = '折线图';
      const config = getG2Config<'line'>(chartType);
      plot = new Line('container', config);
    } else if (chartType === 'pie') {
      this.chartName = '饼图';
      const config = getG2Config<'pie'>(chartType);
      plot = new Pie('container', config);
    } else if (chartType === 'radar') {
      this.chartName = '雷达图';
      const config = getG2Config<'radar'>(chartType);
      plot = new Radar('container', config);
    } else if(chartType === 'bar') {
      this.chartName = '条形图';
      const config = getG2Config<'bar'>(chartType);
      plot = new Bar('container', config);
    }
    plot.render();
  }

  constructor(private cdr: ChangeDetectorRef) {}
}
