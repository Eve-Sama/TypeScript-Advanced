import { ChartType, FindConfigByType } from './demo4.interface';

export function getG2Config<T extends ChartType>(
  chartType: ChartType
): FindConfigByType<T> {
  const config: FindConfigByType<typeof chartType> = { data: null };
  _dealConfigByChartType(config, chartType);
  _dealConfigData(config, chartType);
  return config as FindConfigByType<T>;
}

function _dealConfigByChartType(
  config: FindConfigByType<typeof chartType>,
  chartType: ChartType
): void {
  if (chartType === 'line') {
    const tempConfig: FindConfigByType<typeof chartType> = {
      data: null,
      xField: 'year',
      yField: 'value',
    };
    Object.assign(config, tempConfig);
  } else if (chartType === 'pie') {
    const tempConfig: FindConfigByType<typeof chartType> = {
      data: null,
      appendPadding: 10,
      angleField: 'value',
      colorField: 'type',
      radius: 0.9,
      label: {
        type: 'inner',
        offset: '-30%',
        content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      interactions: [{ type: 'element-active' }],
    };
    Object.assign(config, tempConfig);
  } else if (chartType === 'radar') {
    const tempConfig: FindConfigByType<typeof chartType> = {
      data: null,
      xField: 'name',
      yField: 'star',
      appendPadding: [0, 10, 0, 10],
      meta: {
        star: {
          alias: 'star 数量',
          min: 0,
          nice: true,
          formatter: (v) => Number(v).toFixed(2),
        },
      },
      xAxis: {
        tickLine: null,
      },
      yAxis: {
        label: false,
        grid: {
          alternateColor: 'rgba(0, 0, 0, 0.04)',
        },
      },
      // 开启辅助点
      point: {
        size: 2,
      },
      area: {},
    };
    Object.assign(config, tempConfig);
  } else if (chartType === 'bar') {
    const tempConfig: FindConfigByType<typeof chartType> = {
      data: null,
      xField: 'value',
      yField: 'year',
      seriesField: 'year',
      legend: {
        position: 'top-left',
      },
    };
    Object.assign(config, tempConfig);
  }
}

function _dealConfigData(
  config: Record<string, any>,
  chartType: ChartType
): void {
  if (chartType === 'line') {
    const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ];
    config.data = data;
  } else if (chartType === 'pie') {
    const data = [
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
      { type: '分类五', value: 10 },
      { type: '其他', value: 5 },
    ];
    config.data = data;
  } else if (chartType === 'radar') {
    const data = [
      { name: 'G2', star: 10371 },
      { name: 'G6', star: 7380 },
      { name: 'F2', star: 7414 },
      { name: 'L7', star: 2140 },
      { name: 'X6', star: 660 },
      { name: 'AVA', star: 885 },
      { name: 'G2Plot', star: 1626 },
    ];
    const finalData = data.map((d) => ({ ...d, star: Math.sqrt(d.star) }));
    config.data = finalData;
  } else if (chartType === 'bar') {
    const data = [
      { year: '1951 年', value: 38 },
      { year: '1952 年', value: 52 },
      { year: '1956 年', value: 61 },
      { year: '1957 年', value: 145 },
      { year: '1958 年', value: 48 },
    ];
    config.data = data;
  }
}
