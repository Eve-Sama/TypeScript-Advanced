export const Charts = ['pie', 'line', 'radar'] as const;
export type ChartType = typeof Charts[number];
