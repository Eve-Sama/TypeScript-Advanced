export interface BasicField {
  id: string;
  /** 字段的值 */
  value: string;
  type: FieldType;
}

export interface TextField extends BasicField {}
export interface DateField extends BasicField {
  /** 日期格式 */
  format: FieldFormat;
}
export interface ImageField extends BasicField {
  src: string;
}

export type FieldType = 'text' | 'date' | 'image';
export type FieldFormat = 'yyyy' | 'yyyy-mm' | 'yyyy-mm-dd';

export type Field = TextField | DateField | ImageField;
