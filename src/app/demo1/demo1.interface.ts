export interface Field {
  id: string;
  /** 字段的值 */
  value: string;
  /** 日期格式 */
  format?: string;
  /** 图片地址 */
  src?: string;
  type: string;
}
