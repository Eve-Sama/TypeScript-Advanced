import { Component } from '@angular/core';
import {
  DateField,
  Field,
  FieldFormat,
  FieldType,
  ImageField,
  TextField,
} from './demo1.interface';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss'],
})
export class Demo1Component {
  fieldType: string;
  format: FieldFormat = 'yyyy';
  /** 字段的详细信息 */
  field: Field;

  setField(type: FieldType): void {
    this.fieldType = type;
    // 初始化field信息
    const id = '1';
    const value = '1';
    if (type === 'text') {
      const field: TextField = {
        id,
        type,
        value,
      };
      this.field = field;
    } else if (type === 'date') {
      const field: DateField = {
        id,
        value,
        type,
        format: this.format,
      };
      this.field = field;
    } else if (type === 'image') {
      const field: ImageField = {
        id,
        value,
        type,
        src: 'qingflow.com',
      };
      this.field = field;
    }
  }

  setFormat(type: FieldFormat): void {
    this.format = type;
    (this.field as DateField).format = type;
  }
}
