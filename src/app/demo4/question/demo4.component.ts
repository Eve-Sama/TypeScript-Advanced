import { ChangeDetectorRef, Component } from '@angular/core';
import {
  Line,
  LineOptions,
  Pie,
  PieOptions,
  Radar,
  RadarOptions,
} from '@antv/g2plot';
import { ChartType } from './demo4.interface';
import { getG2Config } from './g2-render-engine';

@Component({
  selector: 'app-demo4',
  templateUrl: './demo4.component.html',
  styleUrls: ['./demo4.component.scss'],
})
export class Demo4Component {
  charts: ChartType[] = ['pie', 'line', 'radar'];
  chartName = '尚未选择';
  show = false;

  select(chartType: ChartType): void {
    this._update();
    let plot: Line | Pie | Radar;
    if (chartType === 'line') {
      this.chartName = '折线图';
      const config = getG2Config(chartType);
      plot = new Line('container', config as LineOptions);
    } else if (chartType === 'pie') {
      this.chartName = '饼图';
      this._update();
      const config = getG2Config(chartType);
      plot = new Pie('container', config as PieOptions);
    } else if (chartType === 'radar') {
      this.chartName = '雷达';
      this._update();
      const config = getG2Config(chartType);
      plot = new Radar('container', config as RadarOptions);
    }
    plot.render();
  }

  private _update(): void {
    this.show = false;
    this.cdr.detectChanges();
    this.show = true;
    this.cdr.detectChanges();
  }
  constructor(private cdr: ChangeDetectorRef) {}
}
