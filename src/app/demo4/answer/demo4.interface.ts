import { BarOptions, LineOptions, PieOptions, RadarOptions } from '@antv/g2plot';

export interface ChartTypeConfigMapping {
  /** 饼图 */
  pie: PieOptions;
  /** 折线图 */
  line: LineOptions;
  /** 雷达图 */
  radar: RadarOptions;
  /** 条形图 */
  bar: BarOptions;
}

export type ChartType = keyof ChartTypeConfigMapping;
export type ChartConfig = ChartTypeConfigMapping[ChartType];
// const a: ChartType = 'line';
// export type ChartConfig = ChartTypeConfigMapping[ChartType];
export type FindConfigByType<T extends ChartType> = ChartTypeConfigMapping[T];
type A = FindConfigByType<'line'>;
type B = FindConfigByType<'pie'>;

// type Demo1<T> = T extends ChartType ? true : false;

// type Demo2 = Demo1<'line'>;

// const a = 'a';
// console.log(a);
// type aa = 'a';
// type bb = typeof a;
